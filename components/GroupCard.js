import Link from "next/link";

/**
 * A card component to display the details of a group on a user's dashboard
 */
const GroupCard = ({ group }) => {
  return (
    <div className="container transition shadow-md hover:shadow-xl border border-gray-100 flex flex-col min-w-25 max-w-sm rounded overflow-hidden my-2">
      <div className="p-3 text-center text-white bg-gradient-to-tr from-green-400 to-blue-500 min-w-0">
        <h2 className="font-medium text-xl mb-1">{group.name}</h2>
        <p className="text-xs truncate">{group.description}</p>
      </div>

      <div className="p-3 flex items-center flex-row justify-end">
        <Link href={`/group/${group["_id"]}`}>
          <a className="bg-green-500 transition hover:bg-green-600 text-white font-medium py-1 px-3 rounded">
            Open
          </a>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
