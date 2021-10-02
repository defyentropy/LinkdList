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
import ErrorCard from "components/ErrorCard";

const GroupView = ({ groupDetails: group, links: linkList, error }) => {

    if (error) {
        return (
            <ErrorCard />
        )
    }

    const [links, setLinks] = useState(linkList)

    const deleteLink = async id => {
        const res = await axios.delete(`/api/link/${id}`);

        if (res.error) {
            console.log(res.error);
        }
        else {

            const updatedGroup = await axios.get(`/api/group/${group["_id"]}`);

            if (updatedGroup.error) {
                console.log(updatedGroup.error);
            }
            else {
                setLinks(updatedGroup.data.data.links)
            }
        }
    }

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

                <h1 className="text-white text-6xl font-bold">{group.name}</h1>
            </div>

            <div className="mb-16 px-4 pt-4 pb-8 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    links.map(link => (
                        <LinkCard link={link} delete={deleteLink} />
                    ))
                }
            </div>

            <NextLink href={`/create/link?grpId=${group["_id"]}&grpName=${group["name"]}`}>
                <a className="text-3xl p-3 flex items-center justify-center fixed bottom-12 right-12 w-12 h-12 hover:shadow-lg shadow-md transition text-white font-medium rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                    <AddIcon />
                </a>
            </NextLink>
        </>
    );
}

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
        } catch (err) {
            error = JSON.parse(JSON.stringify(err));
        }

        // If the group does not exist or the user is not part of it, return an error
        if (!groupDetails || !groupDetails.participants.includes(user.email)) {
            error = "NO_ACCESS";

            return {
                props: {
                    groupDetails,
                    links,
                    error
                }
            }
        }

        // If the group exists and the user is part of it, fetch its links
        try {
            links = await Link.find({
                groupID: { $in: [groupDetails["_id"]] }
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
                error
            }
        }
    }
})

export default GroupView;