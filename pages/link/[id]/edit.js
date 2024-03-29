import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import axios from "axios";
import * as Yup from "yup";
import FormField from "components/FormField";
import Link from "models/Link";
import dbConnect from "lib/dbConnect";
import ErrorCard from "components/ErrorCard";
import { tagsToString } from "lib/tags";
import { useState } from "react";
import ErrorAlert from "components/ErrorAlert";

const ResourceForm = ({ linkData, error: GSSPError }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  if (GSSPError) {
    return <ErrorCard />;
  }

  const editLink = async (values) => {
    console.log("update started");
    const res = await axios.put(`/api/link/${linkData._id}`, values);

    if (res.data.error) {
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      router.push(`/group/${linkData.groupID}`);
    }
  };

  return (
    <>
      <Head>
        <title>Edit | LinkdList</title>
      </Head>

      <h1 className="text-4xl mt-6 mb-6 font-medium text-center">
        Edit &ldquo;{linkData.title}&rdquo;
      </h1>

      <Formik
        initialValues={{
          title: linkData.title,
          description: linkData.description,
          hyperlink: linkData.hyperlink,
          type: linkData.type,
          creator: linkData.creator,
          tags: tagsToString(linkData.tags),
          groupID: linkData.groupID,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(200, "Must be 200 characters or less")
            .required("Required"),
          hyperlink: Yup.string().url().required("Required"),
          type: Yup.string().required("Required").oneOf(["page", "video"]),
          creator: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          tags: Yup.string().notRequired(),
          groupID: Yup.string().required().oneOf([linkData.groupID]),
        })}
        onSubmit={editLink}
      >
        <Form
          className="p-5 flex flex-col mx-auto max-w-sm shadow-lg border-t-4 border-green-400 mb-16"
          autoComplete="off"
        >
          <FormField fieldName="title" desc="Link title" />
          <FormField fieldName="hyperlink" desc="Hyperlink" />

          <div>
            <label className="sr-only" htmlFor="description">
              Description
            </label>
            <Field
              name="description"
              as="textarea"
              placeholder="Resource description"
              className="block w-full p-3 bg-gray-100 rounded-t border-b-2 border-gray-100 focus:border-green-400 focus:outline-none h-16 max-h-32"
            />
            <p className="block text-red-500 font-medium text-sm h-8">
              <ErrorMessage name="description" />
            </p>
          </div>

          <FormField fieldName="creator" desc="Resource creator" />

          <div className="flex mb-8">
            <label className="flex items-center mr-4">
              <Field
                type="radio"
                name="type"
                value="video"
                className="appearance-none h-4 w-4 checked:bg-green-400 border border-green-400 rounded-full mx-2"
              />
              Video
            </label>

            <label className="flex items-center mr-4">
              <Field
                type="radio"
                name="type"
                value="page"
                className="appearance-none h-4 w-4 checked:bg-green-400 border border-green-400 rounded-full mx-2"
              />
              Webpage
            </label>

            <p className="block text-red-500 font-medium text-sm h-8">
              <ErrorMessage name="type" />
            </p>
          </div>

          <FormField fieldName="tags" desc="Comma-separated tags" />

          <div className="hidden">
            <Field name="groupID" type="text" />
          </div>

          <button
            className="py-2 px-4 bg-green-400 shadow-md hover:shadow-lg transition text-white font-medium mb-6"
            type="submit"
          >
            Update
          </button>

          <NextLink href={`/group/${linkData.groupID}`}>
            <a className="text-green-400 hover:underline font-medium text-center text-sm">
              Cancel
            </a>
          </NextLink>
        </Form>
      </Formik>

      <ErrorAlert error={error} />
    </>
  );
};

export default ResourceForm;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    let linkData = null;
    let error = null;

    const linkId = context.params.id;
    const user = getSession(context.req, context.res).user;

    try {
      await dbConnect();
      linkData = await Link.findById(linkId);
      linkData = JSON.parse(JSON.stringify(linkData));
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
    }

    if (!linkData) {
      return {
        props: {
          linkData: null,
          error: "LINK_DOESNT_EXIST",
        },
      };
    }

    if (linkData.owner !== user.email) {
      linkData = null;
      error = "ACCESS_DENIED";
    }

    return {
      props: {
        linkData,
        error,
      },
    };
  },
});
