import Link from "next/link";

/**
 * Displays an error message.
 * Used when an error happened while fetching data or if a user tries to access data that is not theirs
 */
const ErrorCard = () => {
  return (
    <div className="max-w-md shadow-lg rounded mx-auto my-8 p-8">
      <h1 className="text-center font-bold text-3xl mb-4">
        Oops! There was an error.
      </h1>
      <p className="mb-3">
        This could be because you don&apos;t have access to this resource.
      </p>

      <Link href="/dashboard">
        <a className="block mx-auto p-3 rounded bg-green-400 hover:bg-green-500 hover:shadow-md text-center font-medium text-white">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

export default ErrorCard;
