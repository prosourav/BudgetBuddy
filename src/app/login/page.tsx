import LoginForm from "@/app/(auth)/LoginForm";
import ProtectedRoute from "../(auth)/ProtectedRoute";

const Login: React.FC = (): JSX.Element => {
  return (
    <ProtectedRoute>
      <LoginForm />
    </ProtectedRoute>

  );
};
export default Login;