import styles from "../styles/AppBar.module.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const AppBar = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return (
            <nav className="sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
                <p className="text-blue-500 font-medium text-2xl mr-auto">CrowdStudy</p>
            </nav>
        );
    }

    if (error) {
        return (
            <nav className="sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
                <p className="text-blue-500 font-medium text-2xl mr-auto">
                    CrowdStudy
                </p>

                <p>Unable to load login. Try again later</p>
            </nav>
        )
    }

    if (!user) {
        return (
            <nav className="sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
                
                <p className="text-blue-500 font-medium text-2xl mr-auto">CrowdStudy</p>

                <Link href="/api/auth/login?returnTo=/dashboard">
                    <a className="py-2 px-4 hover:bg-blue-600 hover:shadow-lg duration-200 bg-blue-500 text-white font-medium rounded-full">Login</a>
                </Link>
            </nav>
        )
    }

    return (
        <nav className="sticky top-0 border-b bg-white border-blue-500 flex flex-row p-3 items-center justify-right">
            <Link href="/dashboard">
                <a className="text-blue-500 font-medium text-2xl mr-auto">CrowdStudy</a>
            </Link>

            <img src={ user.picture } alt={ user.name } className="w-9 h-9 rounded-full mx-4"/>

            <Link href="/api/auth/logout">
                <a className="py-2 px-4 hover:bg-blue-600 hover:shadow-lg duration-200 bg-blue-500 text-white font-medium rounded-full">Logout</a>
            </Link>
        </nav>
    );
}

export default AppBar;