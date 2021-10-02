import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import FormField from "components/FormField";

const GroupForm = () => {

    const router = useRouter();

    const addGroup = async values => {
        const res = await axios.post("/api/create/group", values)

        if (res.error) {
            console.log(res.error)
        }
        else {
            router.push("/dashboard")
        }
    }

    return (
        <>
            <h1 className="text-4xl lg:w-full w-60 mx-auto mt-6 mb-12 font-medium text-center">Create a new group</h1>

            <Formik
                initialValues={{name: "", description: ""}}

                validationSchema = {Yup.object({
                    name: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    description: Yup.string()
                        .max(100, "Must be 100 characters or less")
                        .required("Required")
                })}

                onSubmit={addGroup}
            >

                <Form className="p-5 flex flex-col mx-auto max-w-sm shadow-lg border-t-4 border-green-400 mb-16" autoComplete="off">

                    <FormField fieldName="name" desc="Group name" />
                    <FormField fieldName="description" desc="Group description" />

                    <button 
                        className="py-2 px-4 bg-green-400 shadow-md hover:shadow-lg transition text-white font-medium mb-6" 
                        type="submit"
                    >
                        Add group
                    </button>
                
                    <Link href="/dashboard">
                        <a className="text-green-400 hover:underline font-medium text-center text-sm">Cancel</a>
                    </Link>
                </Form>

            </Formik>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default GroupForm;