import Head from "next/head";
import DeleteIcon from "icons/DeleteIcon";
import EditIcon from "icons/EditIcon";
import FlightIcon from "icons/FlightIcon";
import NextLink from "next/link";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const MockLink = ({ link }) => {
  return (
    <div
      key={link["_id"]}
      className="container transition shadow-md hover:shadow-xl flex flex-col min-w-25 max-w-sm rounded border bg-white border-gray-100 my-2 overflow-hidden"
    >
      <div className="py-auto px-3 min-w-0 text-center">
        <h1 className="text-2xl text-blue-500 font-medium mb-1 mt-2 truncate">
          {link.title}
        </h1>
        <p className="text-xs mb-2 text-gray-500">
          A {link.type} by {link.creator}
        </p>
      </div>

      <div className="my-2 mx-3 bg-green-500 bg-opacity-25 rounded p-3 flex-grow">
        <p className="text-sm">{link.description}</p>
      </div>

      <div className="flex flex-row items-end mb-3 mx-3">
        {link.tags ? (
          link.tags.map((tag, idx) => (
            <span
              className="text-xs inline-block mx-1 font-medium text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
              key={idx}
            >
              #{tag}
            </span>
          ))
        ) : (
          <p>No tags</p>
        )}
      </div>

      <div className="flex-grow-0 p-2 bg-white flex flex-row justify-start">
        <button onClick={() => {}} className="mx-1">
          <DeleteIcon />
        </button>

        <NextLink href={`#`}>
          <a className="flex items-center">
            <EditIcon />
          </a>
        </NextLink>

        <a
          href={link.hyperlink}
          className="ml-auto px-3 py-2 w-24 rounded flex items-center justify-evenly transition bg-green-500 hover:bg-green-600 font-medium text-white"
        >
          <FlightIcon /> Visit
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !error) {
      router.push("/dashboard");
    }
  }, [user, isLoading, error]);

  const link = {
    title: "An example",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit odio tempora exercitationem, esse incidunt nesciunt est ad ducimus ea veniam.",
    hyperlink: "#",
    type: "page",
    creator: "LinkdList",
    tags: ["exampletag", "anotherone"],
    _id: "45df63",
  };

  return (
    <>
      <Head>
        <title>LinkdList</title>
      </Head>

      <div className="grid grid-cols-12">
        <div className="h-72 sm:h-96 col-span-full bg-gradient-to-tr from-green-400 to-blue-500 p-5 grid grid-cols-12">
          <div className="col-span-full sm:col-span-6 flex flex-col justify-center">
            <h1 className="font-bold text-5xl md:text-6xl lg:text-8xl text-white">
              Bookmarks,
            </h1>
            <h1 className="font-bold text-5xl md:text-6xl lg:text-8xl text-white mb-2">
              but better.
            </h1>
            <p className="text-xs md:text-sm text-white mb-12">
              Like, way better.
            </p>
            <NextLink href="/api/auth/login?returnTo=/dashboard">
              <a className="bg-white block text-green-500 p-2 rounded font-medium text-center w-48 hover:shadow-lg transition">
                Get started
              </a>
            </NextLink>
          </div>

          <div className="hidden sm:flex col-span-6 justify-center items-center">
            <MockLink link={link} />
          </div>
        </div>

        <div className="col-span-full flex flex-col justify-center h-96 sm:w-max sm:h-48 pl-5 pr-10 my-10 sm:mr-10 mr-5 border-t-2 border-r-2 border-b-2 border-green-500 rounded-r-full">
          <h2 className="font-bold text-3xl mb-4 text-green-500">
            Put some context into your bookmarks.
          </h2>
          <p className="text-md">
            Ever made a @#%* ton of bookmarks and forgot why you ever saved them
            in the first place?
          </p>
          <p className="text-md">
            With link descriptions in LinkdList, that doesn't have to happen.
            Write down exactly why you need that link.
          </p>
        </div>

        <div className="col-span-full flex flex-col justify-center h-96 sm:h-48 sm:w-max pl-10 pr-5 mb-10 sm:ml-auto ml-5 border-t-2 border-l-2 border-b-2 border-green-500 rounded-l-full">
          <h2 className="text-right font-bold text-3xl mb-4 text-green-500">
            Find your links painlessly.
          </h2>
          <p className="text-md text-right">
            Frantically looking through your bookmarks bar isn't fun.
          </p>
          <p className="text-md text-right">
            Instead, tag your links in LinkdList and filter through them, so you
            can find the link you need, when you need it.
          </p>
        </div>

        <div className="col-span-full flex flex-col justify-center h-96 sm:h-48 sm:w-max sm:mr-10 mr-5 pl-5 pr-10 mb-10 border-t-2 border-r-2 border-b-2 border-green-500 rounded-r-full">
          <h2 className="font-bold text-3xl mb-4 text-green-500">
            Organise your bookmarks beautifully.
          </h2>
          <p className="text-md">
            Let's face the truth: those folders in your bookmarks bar are ugly.
            LinkdList is not. That's all we have to say.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
