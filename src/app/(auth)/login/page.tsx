"use client"
import LoginForm from "@/components/LoginForm";
import { userformSchema } from "@/schemas";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/actions";
import toast from "react-hot-toast";

// Define the shape of your form data
type FormData = z.infer<typeof userformSchema>;

const Login: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userformSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await doCredentialLogin(data);
      if (res) {
        return router.push('/');
      }
    } catch (error) {
      toast.error("Check your credentials");
    }

  };

  return (
    <AuthRoute>
      <LoginForm register={register} errors={errors} submitValue={handleSubmit(onSubmit)} />
    </AuthRoute>
  );
};

export default Login;