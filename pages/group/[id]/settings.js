import Link from "next/link";
import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { getSession } from "@auth0/nextjs-auth0";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Settings = ({ groupDetails: group, error }) => {

    if (error) {
        return (
            <>
                <Head>
                    <title>Error | CrowdStudy</title>
                </Head>

                <h1 className="text-center font-medium my-4 text-4xl">
                    Whoops! It looks like you can't access this group right now.
                </h1>

                <p>This could be because it is:</p>

                <ul>
                    <li>Private</li>
                    <li>Non-existent</li>
                    <li>Just down at the moment</li>
                </ul>

                <p className="text-center my-3">
                    Go back to your <NextLink href="/dashboard"><a className="text-blue-500 underline">dashboard</a></NextLink>.
                </p>
            </>
        )
    }

    return (
        <>
            <div className="bg-blue-500 w-full h-40 bg-opacity-75 flex justify-center items-center relative">

                <Link href={`/group/${group._id}`}>
                    <a className="absolute top-4 left-4"> {"< Back"} </a>
                </Link>

                <h1 className="text-white text-4xl font-bold">
                    <span className="italic">Settings for </span>
                    {group.name}
                </h1>
            </div>


            <div className="flex flex-col items-center">
                <h2 className="text-blue-500 text-4xl font-medium">Group details</h2>

                <Formik
                    initialValues={{
                        groupName: group.name,
                        groupDesc: group.description
                    }}

                    validationSchema={Yup.object({
                        groupName: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        groupDesc: Yup.string()
                            .max(100, "Must be 100 characters or less")
                            .required("Required")
                    })}
                >
                    <Form autoComplete="off">
                        <label htmlFor="groupName" className="sr-only">Name</label>
                        <Field
                            name="groupName"
                            className="mt-3 mb-1 lg:w-72 w-60 h-14 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="text-red-500 text-sm h-5 font-medium"><ErrorMessage name="groupName" /></p>

                        <label htmlFor="groupDesc" className="sr-only">Group description</label>

                        <Field
                            name="groupDesc"
                            className="mt-3 mb-1 lg:w-72 w-60 h-14 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="text-red-500 text-sm h-5 font-medium"><ErrorMessage name="groupDesc" /></p>
                    </Form>
                </Formik>
            </div>

        </>
    )

}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {

        const user = getSession(context.req, context.res).user;
        const { id: groupId } = context.params;
        let error = null;
        let groupDetails = null;

        try {
            await dbConnect();
            groupDetails = await Group.findById(groupId);
            groupDetails = JSON.parse(JSON.stringify(groupDetails));
        } catch (err) {
            error = JSON.parse(JSON.stringify(err))
        }

        if (!groupDetails || !groupDetails.participants.includes(user.email)) {
            error = "NO_ACCESS";
        }

        return {
            props: {
                groupDetails,
                error
            }
        }
    }
})

export default Settings;