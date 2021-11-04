import { Field, ErrorMessage } from "formik";

/**
 * Wrapper around the Field and ErrorMessage components from Formik
 * Returns a div with a label, Field and ErrorMessage
 */
const FormField = (props) => {
  return (
    <div>
      <label className="sr-only" htmlFor="title">
        {props.desc}
      </label>
      <Field
        name={props.fieldName}
        type="text"
        placeholder={props.desc}
        className="block w-full p-3 bg-gray-100 rounded-t border-b-2 border-gray-100 focus:border-green-400 focus:outline-none"
      />
      <p className="block text-red-500 font-medium text-sm h-8">
        <ErrorMessage name={props.fieldName} />
      </p>
    </div>
  );
};

export default FormField;
