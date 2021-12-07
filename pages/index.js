import Head from "next/head";
import DeleteIcon from "icons/DeleteIcon";
import EditIcon from "icons/EditIcon";
import FlightIcon from "icons/FlightIcon";
import NextLink from "next/link";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

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
  }, [user, isLoading, error, router]);

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

        <div className="col-span-full grid grid-cols-12 lg:col-start-2 lg:col-end-12 pt-8">
          <div className="col-start-2 col-end-12 mb-12 grid grid-cols-12 p-2 gap-8">
            <div className="relative md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-3 row-start-3 row-end-4 col-span-full">
              <Image
                className="opacity-50"
                src="/description.svg"
                alt="description graphic"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-green-500 md:text-4xl md:row-span-1 md:col-start-7 md:col-end-13 self-center font-medium text-center text-3xl row-start-1 row-end-2 col-span-full">
              Describe your links easily
            </h2>
            <p className="text-gray-600 text-center md:col-start-7 md:col-end-13 md:row-span-1 row-start-2 row-end-3 col-span-full">
              Ever made a #$%$ ton of bookmarks but forgotten what they were for
              a few weeks later? With LinkdList, add descriptions to your
              bookmarks so you&apos;ll always know what that link is for.
            </p>
          </div>

          <div className="col-start-2 col-end-12 grid grid-cols-12 gap-8 mb-12">
            <h2 className="text-green-500 text-4xl font-medium text-center self-center md:col-start-1 md:col-end-6 col-span-full row-start-1 row-end-2">
              Find your links painlessly
            </h2>
            <p className="text-gray-600 text-center md:col-start-1 md:col-end-6 row-start-2 row-end-3 col-span-full">
              Frantically looking through your bookmarks bar isn&apos;t fun.
              Instead, LinkdList allows you to search and filter your links, so
              you can find what you need in a pinch.
            </p>
            <div className="relative md:col-start-7 md:col-end-13 md:row-start-1 md:row-end-3 row-start-3 row-end-4 col-span-full">
              <Image
                src="/find.svg"
                alt="find graphic"
                className="opacity-50"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-start-2 col-end-12 mb-12 grid grid-cols-12 gap-8 md:gap-0">
            <div className="relative md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-3 row-start-3 row-end-4 col-span-full">
              <Image
                src="/nofoldertwo.svg"
                alt="beautiful graphic"
                className="opacity-50"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-green-500 md:text-4xl text-3xl font-medium text-center md:col-start-7 md:col-end-13 self-center row-start-1 row-end-2 col-span-full">
              Organise your links beautifully
            </h2>
            <p className="text-gray-600 text-center md:col-start-7 md:col-end-13 row-start-2 row-end-3 col-span-full my-2">
              Let&apos;s face the truth: those folders in your bookmarks bar are
              ugly. LinkdList is not. LinkdList combines a modern design and
              color scheme with the utility you&apos;ve always wanted and
              needed.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
