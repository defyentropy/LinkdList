import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const AppBar = () => {
  const { user, error, isLoading } = useUser();

  return (
    <nav className="z-50 sticky top-0 border-b bg-white border-gray-300-500 flex flex-row p-3 items-center justify-right">
      <p className="text-2xl mr-auto">
        <span className="font-medium text-blue-700">Linkd</span>
        <span className="font-bold text-green-400">List</span>
      </p>

      {!isLoading ? (
        error ? (
          <p>Auth error occurred. Please try again later</p>
        ) : !user ? (
          <Link href="/api/auth/login?returnTo=/dashboard">
            <a className="py-2 px-4 hover:bg-green-500 transition hover:shadow-lg duration-200 bg-green-400 text-white font-medium rounded">
              Login
            </a>
          </Link>
        ) : (
          <>
            <img
              src={user.picture}
              alt={user.name}
              className="w-9 h-9 rounded-full mx-4"
            />

            <Link href="/api/auth/logout">
              <a className="py-2 px-4 hover:bg-green-500 transition hover:shadow-lg bg-green-400 text-white font-medium rounded">
                Logout
              </a>
            </Link>
          </>
        )
      ) : null}
    </nav>
  );

  //   if (isLoading) {
  //     return (
  //       <nav className="z-50 sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
  //         <p className="text-blue-500 font-medium text-2xl mr-auto">LinkdList</p>
  //       </nav>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <nav className="z-50 sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
  //         <p className="text-blue-500 font-medium text-2xl mr-auto">LinkdList</p>

  //         <p>Unable to load login. Try again later</p>
  //       </nav>
  //     );
  //   }

  //   if (!user) {
  //     return (
  //       <nav className="z-50 sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
  //         <p className="text-blue-500 font-medium text-2xl mr-auto">LinkdList</p>

  //         <Link href="/api/auth/login?returnTo=/dashboard">
  //           <a className="py-2 px-4 hover:bg-blue-600 transition hover:shadow-lg duration-200 bg-blue-500 text-white font-medium rounded">
  //             Login
  //           </a>
  //         </Link>
  //       </nav>
  //     );
  //   }

  //   return (
  //     <nav className="z-50 sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
  //       <Link href="/dashboard">
  //         <a className="text-blue-500 font-medium text-2xl mr-auto">LinkdList</a>
  //       </Link>

  //       <img
  //         src={user.picture}
  //         alt={user.name}
  //         className="w-9 h-9 rounded-full mx-4"
  //       />

  //       <Link href="/api/auth/logout">
  //         <a className="py-2 px-4 hover:bg-blue-600 transition hover:shadow-lg bg-blue-500 text-white font-medium rounded">
  //           Logout
  //         </a>
  //       </Link>
  //     </nav>
  //   );
};

export default AppBar;
