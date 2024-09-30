import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type FormValues = {
  customerName: string;
  message: string;
  email_id: string;
};

export default function ContactPage() {
  const router = useRouter();

  // Step 1: Initialize react-hook-form's useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Step 2: Function to handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Further steps: You can send this data to an API, display a message, etc.
    try {
      const response = await fetch("/api/formData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/contact/thank-you");
      } else {
        console.error("Server Error! Failed to send message.");
        alert("Server Error! Failed to send message.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-24 p-4">
      <div className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Contact Me</h1>

        {/* Step 3: Form setup with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="customerName" className="block mb-2">
              Name
            </label>
            <input
              id="customerName"
              type="text"
              {...register("customerName", { required: true })}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            {errors?.customerName && (
              <span className="text-red-500">
                This field is required, please write your Name properly.
              </span>
            )}
          </div>

          {/* message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Subject/Message
            </label>
            <input
              id="message"
              type="text"
              {...register("message", { required: true })}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            {errors?.message && (
              <span className="text-red-500">Please enter a valid message</span>
            )}
          </div>

          {/* email_id Field */}
          <div className="mb-4">
            <label htmlFor="email_id" className="block mb-2">
              Email id
            </label>
            <input
              id="email_id"
              type="email"
              {...register("email_id", { required: true })}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            {errors?.email_id && (
              <span className="text-red-500">check entered Email-id</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 py-2 px-4 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
