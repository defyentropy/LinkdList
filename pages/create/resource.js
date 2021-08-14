import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResourceForm = () => {
    return (
        <>
            <h1 className="text-4xl mt-6 mb-12 font-medium text-center">Create a new resource</h1>

            <Formik
                initialValues={{ title: "", description: "", hyperlink: "", type: "", creator: "", tags: "" }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(100, "Must be 100 characters or less")
                        .required("Required"),
                    description: Yup.string()
                        .max(200, "Must be 200 characters or less")
                        .required(),
                    hyperlink: Yup.string().url().required("Required"),
                    type: Yup.string().required("Required"),
                    creator: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    tags: Yup.string().notRequired()
                })}
                onSubmit={values => console.log(values)}
            >

                <Form className="grid lg:mx-12 m-3 grid-cols-12 gap-2 bg-blue-100 bg-opacity-50 p-3 rounded" autoComplete="off">

                    {/* Title field */}
                    <div className="m-2 lg:col-start-1 lg:col-end-6 col-span-12">
                        <label className="sr-only" htmlFor="title">Resource title</label>
                        <Field
                            name="title"
                            type="text"
                            placeholder="Title"
                            className="w-full lg:w-80 mr-3 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="inline-block text-red-500 font-medium align-middle"><ErrorMessage name="title" /></p>
                    </div>

                    {/* Hyperlink field */}
                    <div className="m-2 lg:col-start-6 lg:col-end-13 col-span-12">
                        <label className="sr-only" htmlFor="hyperlink">Link</label>
                        <Field
                            name="hyperlink"
                            type="text"
                            placeholder="Hyperlink"
                            className="w-full lg:w-96 mr-3 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="inline-block text-red-500 font-medium align-middle"><ErrorMessage name="hyperlink" /></p>
                    </div>

                    {/* Description field */}
                    <div className="mx-2 lg:col-start-1 lg:col-end-6 col-span-12 row-span-2">
                        <label className="sr-only" htmlFor="description">Description</label>
                        <Field
                            name="description"
                            as="textarea"
                            placeholder="Resource description"
                            className=" max-h-32 h-28 lg:w-9/12 w-full mr-3 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="text-red-500 lg:w-2/12 inline-block align-top font-medium"><ErrorMessage name="description" /></p>
                    </div>


                    {/* Creator field */}
                    <div className="m-2 row-span-1 col-span-full lg:col-span-6">
                        <label className="sr-only" htmlFor="creator">Creator</label>
                        <Field
                            name="creator"
                            type="text"
                            placeholder="Resource creator"
                            className="mr-3 w-full lg:w-96 border border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="inline-block text-red-500 font-medium align-middle"><ErrorMessage name="creator" /></p>
                    </div>

                    {/* Type radio buttons */}
                    <div className="m-2 flex flex-row items-center row-span-1 lg:col-span-6">
                        <label className="mr-2 flex flex-row items-center">
                            <Field
                                type="radio"
                                name="type"
                                value="video"
                                className="appearance-none checked:bg-blue-500 border border-blue-500 mx-2 p-2 rounded-full"
                            />
                            Video
                        </label>

                        <label className="ml-2 mr-3 flex flex-row items-center">
                            <Field
                                type="radio"
                                name="type"
                                value="page"
                                className="appearance-none checked:bg-blue-500 border border-blue-500 mx-2 p-2 rounded-full"
                            />
                            Webpage
                        </label>

                        <p className="row-span-1 text-red-500 font-medium"><ErrorMessage name="type" /></p>
                    </div>

                    {/* Tags field */}
                    <div className="m-2 col-span-full">
                        <label className="sr-only" htmlFor="tags">Tags separated by commas</label>
                        <Field
                            name="tags"
                            type="text"
                            placeholder="Tags separated by commas"
                            className=" w-full border w-72 border-blue-500 rounded p-4 focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2"
                        />
                        <p className="inline-block text-red-500 font-medium align-middle"><ErrorMessage name="tags" /></p>
                    </div>

                    {/* Submit button */}
                    <button className="bg-blue-500 mx-auto col-span-full p-3 rounded-full text-white font-medium w-32 hover:bg-blue-700 shadow-lg" type="submit">Add</button>
                </Form>

            </Formik>
        </>
    );
}

export default ResourceForm;

export const getServerSideProps = withPageAuthRequired();