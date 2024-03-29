import Head from "next/head";
import Link from "next/link";
import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import GroupCard from "components/GroupCard";
import AddIcon from "icons/AddIcon";
import ErrorCard from "components/ErrorCard";

const Dashboard = ({ groups: groupList, error: GSSPError }) => {
  if (GSSPError) {
    return <ErrorCard />;
  }

  return (
    <>
      <Head>
        <title>Home | LinkdList</title>
      </Head>

      <h1 className="text-3xl my-2 font-medium font-sans text-center text-green-500">
        Your Lists
      </h1>

      <div className="mb-16 p-4 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {groupList.length !== 0 ? (
          groupList.map((group) => {
            return <GroupCard group={group} key={group._id} />;
          })
        ) : (
          <p className="col-span-full font-bold text-gray-400">
            No lists found. Click the green + at the bottom to make one!
          </p>
        )}
      </div>

      <Link href="/create/group">
        <a className="p-3 flex items-center justify-center fixed bottom-6 right-6 lg:bottom-12 lg:right-12 hover:shadow-lg hover:bg-green-600 shadow-md transition rounded-full bg-green-500">
          <AddIcon />
        </a>
      </Link>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Get user from request
    const req = context.req;
    const res = context.res;
    const user = getSession(req, res).user;

    let groups = null;
    let error = null;

    try {
      await dbConnect();

      groups = await Group.find({
        owner: user.email,
      });

      groups = JSON.parse(JSON.stringify(groups));
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
    }

    return {
      props: {
        groups,
        error,
      },
    };
  },
});
