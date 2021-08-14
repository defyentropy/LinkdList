import AppBar from "./AppBar"

const Layout = ({ children }) => {
    return (
        <>
            <AppBar />
            { children }
        </>
    )
}

export default Layout;