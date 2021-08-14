import Head from "next/head";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = () => {
    
    const groupList = [
        {
            id : "4df59a3e",
            name: "AS Chemistry",
            description: "Chemistry is the bomb.",
            editedOn: "27 Aug 2021"
        },
        {
            id: "ab34df2e",
            name: "AS CS",
            description: "Uprising of the nerds.",
            editedOn: "16 July 2021"
        },
        {
            id: "4a4afg32",
            name: "AS Physics",
            description: "We are a phenomenon.",
            editedOn: "16 August 2021"
        },
        {
            id: "f5sfisd2",
            name: "AS Biology",
            description: "Biologically improbable creatures.",
            editedOn: "16 August 2021"
        },
        {
            id: "sg6dfshy",
            name: "AS Economics",
            description: "Don't even ask.",
            editedOn: "16 August 2021"
        },
        {
            id: "gd7ghdjs",
            name: "AS Maths",
            description: "Progression into insanity.",
            editedOn: "16 August 2021"
        }
    ]

    return (
        <>
            <Head>
                <title>Home | CrowdStudy</title>
            </Head>

            <h1 className="text-3xl my-2 font-medium font-sans text-center">Your Classes</h1>
            
            <div className="mb-16 p-4 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    groupList.map(group => {
                        return (
                            <div className="cursor-default container transition-shadow duration-200 hover:shadow-xl flex flex-col h-72 min-w-25 rounded border border-blue-600 max-w-sm my-2" key={ group.id }>

                                <div className="p-3 text-center">
                                    <h2 className="font-medium text-xl">{ group.name }</h2>
                                    <small>{ group.description }</small>
                                </div>

                                <div className="flex-grow bg-blue-500 bg-opacity-75 text-center">
                                    <p className="align-middle">Cover image here</p>
                                </div>

                                <div className="p-3 flex items-center flex-row justify-between">
                                    <small className="text-blue-500">Last edited on: { group.editedOn }</small>

                                    <Link href="/class">
                                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-full">Open</a>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Link href="/create/resgroup">
                <a className="p-3 transition duration-300 rounded-full shadow-xl text-white font-medium bg-purple-500 hover:bg-purple-700 fixed bottom-6 right-6">+ New Group</a>
            </Link>
        </>
    );
}

export default Dashboard;

export const getServerSideProps = withPageAuthRequired();