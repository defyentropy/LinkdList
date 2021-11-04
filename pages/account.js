import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";

const Account = () => {
  const { user, isLoading, error } = useUser();

  return <pre>{JSON.stringify(user)}</pre>;
};

export default withPageAuthRequired(Account);
