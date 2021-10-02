import NextLink from "next/link"
import DeleteIcon from "icons/DeleteIcon";
import FlightIcon from "icons/FlightIcon";
import EditIcon from "icons/EditIcon"

const LinkCard = ({ link, delete: deleteLink }) => {
    return (
        <div key={link["_id"]} className="container transition shadow-md hover:shadow-xl flex flex-col min-w-25 max-w-sm rounded border border-gray-100 my-2 overflow-hidden">

            <div className="bg-white py-auto px-3 min-w-0 text-center">
                <h1 className="text-2xl text-blue-500 font-medium mb-1 mt-2 truncate">{link.title}</h1>
                <p className="text-xs mb-2 text-gray-500">A {link.type} by {link.creator}</p>
            </div>

            <div className="my-2 mx-3 bg-green-500 bg-opacity-25 rounded p-3 flex-grow">
                <p className="text-sm">{link.description}</p>
            </div>

            <div className="flex flex-row items-end mb-3 mx-3">
                {

                    link.tags ?

                        link.tags.map((tag, idx) => (
                            <span
                                className="text-xs inline-block mx-1 font-medium text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
                                key={idx}>
                                #{tag}
                            </span>
                        ))

                        : <p>No tags</p>

                }
            </div>

            <div className="flex-grow-0 p-2 bg-white flex flex-row justify-start">
                <button onClick={() => deleteLink(link["_id"])} className="mx-1">
                    <DeleteIcon />
                </button>

                <NextLink href={`/link/${link._id}/edit`} >
                    <a className="flex items-center">
                        <EditIcon />
                    </a>
                </NextLink>

                <NextLink href={link.hyperlink}>
                    <a className="ml-auto px-3 py-2 w-24 rounded flex items-center justify-evenly transition bg-green-500 hover:bg-green-600 font-medium text-white">
                        <FlightIcon /> Visit
                    </a>
                </NextLink>
            </div>

        </div>
    )
}

export default LinkCard;