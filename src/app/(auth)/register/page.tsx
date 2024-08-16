"use client"
import RegisterForm from "../../../components/RegisterForm";
import { userCreateFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { doCredentialRegister } from "@/app/actions";


type FormData = z.infer<typeof userCreateFormSchema>;

const Register: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userCreateFormSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      const res = await doCredentialRegister(data);
      if (res) {
        return router.replace('/');
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <AuthRoute>
      <RegisterForm register={register} errors={errors} submitValue={handleSubmit(onSubmit)} />
    </AuthRoute>
  );
};
export default Register;