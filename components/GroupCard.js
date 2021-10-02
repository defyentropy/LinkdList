import Link from "next/link"

const GroupCard = ({ group }) => {
    return (
        <div key={group["_id"]} className="container transition shadow-md hover:shadow-xl border border-gray-100 flex flex-col min-w-25 max-w-sm rounded overflow-hidden my-2">

            <div className="p-3 text-center text-white bg-gradient-to-tr from-green-400 to-blue-500">
                <h2 className="font-medium text-xl">{group.name}</h2>
                <small>{group.description}</small>
            </div>

            <div className="p-3 flex items-center flex-row justify-end">
                <Link href={`/group/${group["_id"]}`}>
                    <a className="bg-blue-500 transition hover:bg-blue-600 text-white font-medium py-1 px-3 rounded">Open</a>
                </Link>
            </div>
        </div>
    )
}

export default GroupCard