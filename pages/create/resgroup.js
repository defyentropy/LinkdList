import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GroupForm = () => {
    return (
        <>
            <h1 className="text-4xl mt-6 mb-12 font-medium text-center">Create a new group</h1>

            <Formik
                initialValues={{name: "", description: ""}}
                validationSchema = {Yup.object({
                    name: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    description: Yup.string()
                        .max(100, "Must be 100 characters or less")
                        .notRequired()
                })}
                onSubmit={values => console.log(values)}
            >

                <Form className="max-w-md grid mx-auto grid-cols-12 gap-2 bg-blue-100 bg-opacity-50 p-5 rounded">

                    <div className="col-span-full flex flex-row items-center">
                        <label htmlFor="name" className="sr-only">Group name</label>
                        <Field
                            name="name"
                            type="text"
                            autoComplete="off"
                            placeholder="Group name"
                            className="w-72 mr-3 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"   
                        />
                        <p className="inline-block text-red-500 font-medium align-middle"><ErrorMessage name="name" /></p>
                    </div>

                    <div className="col-span-full flex flex-row items-center">
                        <label htmlFor="description" className="sr-only">Group description</label>
                        <Field
                            name="description"
                            as="textarea"
                            placeholder="Group description"
                            className="max-h-48 w-72 mr-3 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"    
                        />
                        <p className="w-12 inline-block text-red-500 font-medium align-middle"><ErrorMessage name="description" /></p>
                    </div>

                    <button className="bg-blue-500 mx-auto my-3 col-span-full p-3 rounded-full text-white font-medium w-32 hover:bg-blue-700 shadow-lg" type="submit">Add group</button>
                </Form>

            </Formik>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default GroupForm;