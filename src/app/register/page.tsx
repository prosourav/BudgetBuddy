import ProtectedRoute from "../(auth)/ProtectedRoute";
import RegisterForm from "../(auth)/RegisterForm";

const Register: React.FC = (): JSX.Element => {
  return (
    <ProtectedRoute>
      <RegisterForm />
    </ProtectedRoute>
  );
};
export default Register;