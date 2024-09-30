import Link from "next/link";

const ThankyouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-900 py-24">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Thank You!
        </h1>
        <p className="text-lg text-center mb-4">
          Your submission has been received successfully. We appreciate your
          feedback and will get back to you shortly.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-2 text-white bg-red-400 hover:bg-red-600 rounded-md"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <p>See all submitted form data:</p>
      <Link
        href={"/contact/formData"}
        className="underline hover:text-red-500 transition-all delay-100"
      >
        here
      </Link>
    </div>
  );
};

export default ThankyouPage;
