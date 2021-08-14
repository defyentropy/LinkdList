import Link from "next/link";

const ClassView = () => {
    return (
        <>
            <div className="bg-blue-500 bg-opacity-75 w-full h-60 flex justify-center items-center">
                <h1 className="text-white text-6xl font-bold">AS Chemistry</h1>
            </div>

            <Link href="/create/resource">
                <a className="p-3 fixed bottom-12 right-12 bg-purple-500 shadow-md hover:bg-purple-700 text-white font-medium text-center rounded-full">+ New Link</a>
            </Link>
        </>
    );
}

export default ClassView;