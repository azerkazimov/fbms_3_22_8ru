import { useForm } from "react-hook-form";

export default function Products() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  interface FormData {
    firstName: string;
  }

  const onSubmit = (data: FormData) => {  
    console.log(data);
  }


    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>Это поле обязательно</span>}
      
      <input type="submit" />
    </form>
    );
}