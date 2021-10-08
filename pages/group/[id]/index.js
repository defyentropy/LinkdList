import NextLink from "next/link";
import Head from "next/head";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import Link from "models/Link";
import { useState } from "react";
import LinkCard from "components/LinkCard";
import AddIcon from "icons/AddIcon";
import SettingsIcon from "icons/SettingsIcon";
import BackIcon from "icons/BackIcon";
import ErrorCard from "components/ErrorCard";

const GroupView = ({ groupDetails: group, links: linkList, error }) => {
  if (error) {
    return <ErrorCard />;
  }

  const [linksSource, setLinksSource] = useState(linkList);
  const [links, setLinks] = useState(linkList);
  const [filterQuery, setFilterQuery] = useState("");

  const deleteLink = async (id) => {
    const res = await axios.delete(`/api/link/${id}`);

    if (res.data.error) {
      console.log(res.data.error);
    } else {
      const updatedGroup = await axios.get(`/api/group/${group["_id"]}`);

      if (updatedGroup.data.error) {
        console.log(updatedGroup.data.error);
      } else {
        setFilterQuery("");
        setLinks(updatedGroup.data.data.links);
        setLinksSource(updatedGroup.data.data.links);
      }
    }
  };

  const filterLinks = (e) => {
    e.preventDefault();
    setLinks(linksSource.filter((link) => link.tags.includes(filterQuery)));
  };

  const resetLinks = () => {
    setLinks(linksSource);
    setFilterQuery("");
  };

  return (
    <>
      <Head>
        <title>{group.name} | CrowdStudy</title>
      </Head>

      <div className="w-full h-60 flex justify-center items-center relative bg-gradient-to-tr from-green-400 to-blue-500">
        <NextLink href={`/group/${group._id}/settings`}>
          <a className="absolute top-4 right-4">
            <SettingsIcon />
          </a>
        </NextLink>

        <NextLink href={`/dashboard`}>
          <a className="absolute top-4 left-4">
            <BackIcon />
          </a>
        </NextLink>

        <h1 className="text-white text-6xl font-bold">{group.name}</h1>
      </div>

      <div className="p-4 mt-4 flex justify-center">
        <form autoComplete="off" className="flex">
          <input
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="block w-32 sm:w-48 p-3 bg-gray-100 rounded-tl border-b-2 border-gray-100 focus:border-green-400 focus:outline-none"
            placeholder="Search links"
          />
          <button
            onClick={filterLinks}
            className="p-3 bg-green-400 hover:bg-green-500 font-medium text-white"
          >
            Search
          </button>
        </form>
        <button
          onClick={resetLinks}
          className="p-3 border-t border-r border-b border-green-400 bg-white hover:bg-gray-50 font-medium text-green-400 rounded-r"
        >
          Reset
        </button>
      </div>

      <div className="mb-24 p-4 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {links.length !== 0 ? (
          links.map((link) => <LinkCard link={link} delete={deleteLink} />)
        ) : (
          <p className="col-span-full font-bold text-gray-400">
            No links found
          </p>
        )}
      </div>

      <NextLink
        href={`/create/link?grpId=${group["_id"]}&grpName=${group["name"]}`}
      >
        <a className="text-3xl p-3 flex items-center justify-center fixed bottom-6 right-6 sm:bottom-12 sm:right-12 w-12 h-12 hover:shadow-lg shadow-md transition text-white font-medium rounded-full bg-gradient-to-r from-green-400 to-blue-500">
          <AddIcon />
        </a>
      </NextLink>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const user = getSession(context.req, context.res).user;
    const { id: groupId } = context.params;
    let error = null;
    let groupDetails = null;
    let links = null;

    // Fetch the group data
    try {
      await dbConnect();
      groupDetails = await Group.findById(groupId);
      groupDetails = JSON.parse(JSON.stringify(groupDetails));

      if (!groupDetails) {
        return {
          props: {
            groupDetails: null,
            links: null,
            error: "GROUP_DOESNT_EXIST",
          },
        };
      }

      if (groupDetails.owner !== user.email) {
        return {
          props: {
            groupDetails: null,
            links: null,
            error: "ACCESS_DENIED",
          },
        };
      }
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
      return {
        props: {
          groupDetails: null,
          links: null,
          error: error,
        },
      };
    }

    try {
      links = await Link.find({
        groupID: { $in: [groupDetails["_id"]] },
      });

      links = JSON.parse(JSON.stringify(links));
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
    }

    // Return the page props
    return {
      props: {
        groupDetails,
        links,
        error,
      },
    };
  },
});

export default GroupView;
