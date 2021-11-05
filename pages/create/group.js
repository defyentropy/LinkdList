import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import FormField from "components/FormField";
import Head from "next/head";
import ErrorAlert from "components/ErrorAlert";
import { useState } from "react";

const GroupForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const addGroup = async (values) => {
    const res = await axios.post("/api/create/group", values);

    if (res.data.error) {
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Create a group | LinkdList</title>
      </Head>

      <h1 className="text-4xl w-60 md:w-screen mx-auto mt-6 mb-4 font-medium text-center text-green-500">
        Create a new group
      </h1>

      <Formik
        initialValues={{ name: "", description: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
        })}
        onSubmit={addGroup}
      >
        <div className="p-4 m-0 w-screen flex items-center justify-center">
          <Form
            className="p-5 flex-1 flex flex-col mx-auto max-w-sm shadow-lg border-t-4 border-green-400 mb-16"
            autoComplete="off"
          >
            <FormField fieldName="name" desc="Group name" color="green" />
            <FormField
              fieldName="description"
              desc="Group description"
              color="green"
            />

            <button
              className="py-2 px-4 bg-green-400 shadow-md hover:shadow-lg transition text-white font-medium mb-6"
              type="submit"
            >
              Add group
            </button>

            <Link href="/dashboard">
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

export const getServerSideProps = withPageAuthRequired();

export default GroupForm;
