import AppBar from "./AppBar";

/**
 * Simple layout component to display the AppBar on all pages
 */
const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
