import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";

const Account = () => {
  const { user } = useUser();

  return (
    <>
      <div className="p-4 m-0 w-screen flex justify-center">
        <div className="p-5 flex-1 flex flex-col md:flex-row justify-between items-center max-w-md shadow-lg border-t-4 border-green-400 mb-16">
          <div>
            {user ? (
              <Image
                src={user.picture}
                width="120px"
                height="120px"
                className="rounded-full mb-2 md:mb-0"
              />
            ) : null}
          </div>

          <div>
            <div className="mb-2">
              <p className="text-gray-400 text-sm m-0 p-0">Nickname</p>
              <p className="text-xl font-medium text-green-500 m-0 p-0">
                {user?.nickname}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-400 text-sm m-0 p-0">Name</p>
              <p className="text-xl font-medium text-green-500 m-0 p-0">
                {user?.name}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-400 text-sm m-0 p-0">Email</p>
              <p className="text-xl font-medium text-green-500 m-0 p-0">
                {user?.email}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-400 text-sm m-0 p-0">Email verified?</p>
              <p className="text-xl font-medium text-green-500 m-0 p-0">
                {user?.email_verified ? "✅" : "❌"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Account;
