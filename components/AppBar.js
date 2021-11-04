import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

/**
 * Returns a Navbar component that depends upon the auth state
 * If the user is not logged in, it shows a login button
 * If the user is logged in, it shows their profile picture and a logout button
 * If an error happened while connecting to Auth0, it displays an error message
 */
const AppBar = () => {
  const { user, error, isLoading } = useUser();

  let logoLink = user ? "/dashboard" : "/";

  return (
    <nav className="z-50 sticky top-0 border-b bg-white border-gray-300-500 flex flex-row p-3 items-center justify-right">
      <Link href={logoLink}>
        <a className="text-2xl mr-auto">
          <span className="font-medium text-gray-400">Linkd</span>
          <span className="font-bold text-green-400">List</span>
        </a>
      </Link>

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
            <Link href="/account">
              <a className="mx-4">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-9 h-9 rounded-full"
                />
              </a>
            </Link>

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
};

export default AppBar;
