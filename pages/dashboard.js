import Head from "next/head";
import Link from "next/link";
import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import GroupCard from "components/GroupCard";
import AddIcon from "icons/AddIcon";

const Dashboard = ({ groups: groupList, error }) => {

    return (
        <>
            <Head>
                <title>Home | CrowdStudy</title>
            </Head>

            <h1 className="text-3xl my-2 font-medium font-sans text-center">Your Groups</h1>
            
            <div className="mb-16 p-4 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    error? <p>Error loading groups... { JSON.stringify(error) }</p>

                    :

                    groupList.map(group => {
                        return (
                            <GroupCard group={group} />
                        )
                    })
                }
            </div>

            <Link href="/create/group">
                <a className="p-3 border-4 border-white flex items-center justify-center fixed bottom-6 right-6 lg:bottom-12 lg:right-12 w-14 h-114 hover:shadow-lg shadow-md transition rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                    <AddIcon />
                </a>
            </Link>
        </>
    );
}

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
                participants: { $in: [user.name] }
            });

            groups = JSON.parse(JSON.stringify(groups))
        } catch (err) {
            error = JSON.parse(JSON.stringify(err));
        }

        return {
            props: {
                groups,
                error
            }
        }
    }
},);