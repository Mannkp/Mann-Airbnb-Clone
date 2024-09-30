import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] max-w-6xl min-w-350px mx-auto flex flex-col items-center justify-center px-4 md:px-8">
      <h3 className="text-red-400 text-3xl">Oops... This Page don't exists!</h3>
      <p className="py-8">
        Link for Home Page in case you are lost:{" "}
        <Link
          href={"/"}
          className="text-red-400 hover:underline hover:font-semibold"
        >
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
