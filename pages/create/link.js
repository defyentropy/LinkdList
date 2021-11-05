import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import * as Yup from "yup";
import FormField from "components/FormField";
import Head from "next/head";
import { useState } from "react";
import ErrorAlert from "components/ErrorAlert";

const ResourceForm = ({ q }) => {
  const router = useRouter();

  const [error, setError] = useState();

  const addLink = async (values) => {
    const res = await axios.post("/api/create/link", values);

    if (res.data.error) {
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      router.push(`/group/${q.grpId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create a link | LinkdList</title>
      </Head>

      <h1 className="text-4xl mt-6 mb-2 font-medium text-center text-green-500">
        Create a new resource
      </h1>
      <h2 className="text-2xl mt-0 mb-4 lg:mb-8 text-blue-500 font-medium text-center">
        in {q.grpName}
      </h2>

      <Formik
        initialValues={{
          title: "",
          description: "",
          hyperlink: "",
          type: "",
          creator: "",
          tags: "",
          groupID: q.grpId,
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
          groupID: Yup.string().required().oneOf([q.grpId]),
        })}
        onSubmit={addLink}
      >
        <div className="p-4 m-0 w-screen flex items-center justify-center">
          <Form
            className="p-4 flex-1 flex flex-col max-w-sm shadow-lg border-t-4 border-green-400 mb-16"
            autoComplete="off"
          >
            <FormField fieldName="title" desc="Link title" color="green" />
            <FormField fieldName="hyperlink" desc="Hyperlink" color="green" />

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

            <FormField
              fieldName="creator"
              desc="Resource creator"
              color="green"
            />

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

            <FormField
              fieldName="tags"
              desc="Comma-separated tags"
              color="green"
            />

            <div className="hidden">
              <Field name="grp" type="text" />
            </div>

            <button
              className="py-2 px-4 bg-green-400 shadow-md hover:shadow-lg transition text-white font-medium mb-6"
              type="submit"
            >
              Create
            </button>

            <Link href={`/group/${q.grpId}`}>
              <a className="text-green-400 hover:underline font-medium text-center text-sm">
                Cancel
              </a>
            </Link>
          </Form>
        </div>
      </Formik>

      <ErrorAlert error={error} />
    </>
  );
};

export default ResourceForm;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const q = context.query;

    if (!(q.grpId && q.grpName)) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        q,
      },
    };
  },
});
