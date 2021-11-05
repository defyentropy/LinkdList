const ErrorAlert = ({ error }) => {
  let appearance = !error ? "hidden" : "";

  return (
    <>
      <div
        className={` text-center fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md rounded bg-red-500 text-white p-2 ${appearance}`}
      >
        {error}
      </div>
    </>
  );
};

export default ErrorAlert;
