import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <h1 className="text-8xl font-extrabold text-green-500 text-center mt-5">
        404
      </h1>
      <p className="text-center text-gray-500 font-medium mt-5">
        That's an error.
      </p>
      <Link href="/">
        <a className="block mt-10 text-center text-lg underline text-green-500 hover:no-underline font-bold">
          Go back home
        </a>
      </Link>
    </>
  );
};

export default NotFound;
