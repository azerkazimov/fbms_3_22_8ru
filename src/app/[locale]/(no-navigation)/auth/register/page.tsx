"use client";

import { useForm } from "react-hook-form";

interface FormRegisterValues {
  name: string;
  email: string;
}

interface IRegisterFormProps {
  onSubmit?: (data: FormRegisterValues) => void;
}

export default function RegisterFormTest({ onSubmit }: IRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<FormRegisterValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  

  const handleFormSubmit = (data: FormRegisterValues) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log(data);
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <form
        className="flex flex-col gap-4 w-[400px]"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            className="w-full px-3 py-2 border rounded-md text-black"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md text-black"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
