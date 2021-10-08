import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <p>That's an error.</p>
      <Link href="/dashboard">
        <a>Home</a>
      </Link>
    </>
  );
};

export default NotFound;
