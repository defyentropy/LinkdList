import Link from "next/link";
import Head from "next/head";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { Formik, Form } from "formik";
import FormField from "components/FormField";
import * as Yup from "yup";
import ErrorCard from "components/ErrorCard";
import axios from "axios";
import BackIcon from "icons/BackIcon";
import { useState } from "react";
import ErrorAlert from "components/ErrorAlert";

const Settings = ({ groupDetails: group, error: GSSPError }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  if (GSSPError) {
    return <ErrorCard />;
  }

  const updateGroup = async (values) => {
    const res = await axios.put(`/api/group/${group._id}`, values);

    if (res.data.error) {
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      router.push(`/group/${group._id}`);
    }
  };

  const deleteGroup = async () => {
    const res = await axios.delete(`/api/group/${group._id}`);

    if (res.data.error) {
      console.log(res.data.error);
    } else {
      router.push(`/dashboard`);
    }
  };

  return (
    <>
      <Head>
        <title>{group.name} Group Settings | LinkdList</title>
      </Head>

      <div className="w-full h-48 mb-8 flex justify-center items-center relative bg-gradient-to-tr from-green-400 to-blue-500">
        <Link href={`/group/${group._id}`}>
          <a className="absolute top-4 left-4">
            <BackIcon />
          </a>
        </Link>

        <h1 className="text-white text-4xl text-center flex flex-col">
          <span className="text-sm inline-block">Settings for</span>
          {""}
          <span className="font-bold inline-block">{group.name}</span>
        </h1>
      </div>

      <div>
        <Formik
          initialValues={{
            groupName: group.name,
            groupDesc: group.description,
          }}
          validationSchema={Yup.object({
            groupName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            groupDesc: Yup.string()
              .max(100, "Must be 100 characters or less")
              .required("Required"),
          })}
          onSubmit={(values) => updateGroup(values)}
        >
          <div className="p-4 m-0 w-screen flex items-center justify-center">
            <Form
              autoComplete="off"
              className="p-5 flex-1 flex flex-col mx-auto max-w-sm shadow-lg border-t-4 border-green-400 mb-16"
            >
              <h2 className="text-green-500 text-4xl font-medium mb-4 text-center">
                Group details
              </h2>

              <FormField
                fieldName="groupName"
                desc="Group name"
                color="green"
              />
              <FormField
                fieldName="groupDesc"
                desc="Group description"
                color="green"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-green-400 shadow-md hover:shadow-lg transition text-white font-medium mb-6"
              >
                Update
              </button>
            </Form>
          </div>
        </Formik>
      </div>

      <div>
        <Formik
          initialValues={{
            nameCheck: "",
          }}
          validationSchema={Yup.object({
            nameCheck: Yup.string()
              .oneOf([group.name], "Incorrect name")
              .required("Please type in the name of this group"),
          })}
          onSubmit={deleteGroup}
        >
          <div className="p-4 m-0 w-screen flex items-center justify-center">
            <Form
              autoComplete="off"
              className="p-5 flex-1 flex flex-col mx-auto max-w-sm shadow-lg border-t-4 border-red-500 mb-16"
            >
              <h2 className="text-red-500 text-4xl font-medium mb-4 text-center">
                Delete group
              </h2>
              <p className="mb-4">
                WARNING: Deleting a group means that you will permananently lose
                access to it. Recovering a group is not possible. All the links
                within this group will also be deleted permanently.
              </p>
              <p className="mb-4">
                To delete this group, please type in the name of the group below
                and then press &ldquo;DELETE&rdquo;.
              </p>

              <FormField
                fieldName="nameCheck"
                desc="Type in the group name"
                color="red"
              />
              <button
                className="py-2 px-4 bg-red-500 shadow-md hover:shadow-lg transition text-white font-medium mb-6"
                type="submit"
              >
                DELETE
              </button>
            </Form>
          </div>
        </Formik>
      </div>

      <ErrorAlert error={error} />
    </>
  );
};

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
            error: "ACCESS_DENIED",
          },
        };
      }
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
      return {
        props: {
          groupDetails: null,
          error: error,
        },
      };
    }

    return {
      props: {
        groupDetails,
        error,
      },
    };
  },
});

export default Settings;
