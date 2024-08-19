import { TbPasswordFingerprint } from "react-icons/tb";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { LoginFormProps } from "@/types";

const LoginForm: React.FC<LoginFormProps> = ({ submitValue, register, errors }): JSX.Element => {
  const required = <small style={{ color: 'red' }}>*</small>;

  return (
    <div className="form-container">
      <p className="form-title">Log In on <span className="primary-color">BudgetBuddy</span></p>
      <form onSubmit={submitValue}>
        <div className="form-group">
          <label htmlFor="email">
            <MdOutlineEmail size={20} /> <span>Email</span>{required}
          </label>
          <input
            type="text"
            id="email"
            placeholder="johndoe@example.com"
            {...register("email")}
          />
          {errors.email && <small className="err">{errors.email.message}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <TbPasswordFingerprint size={20} /> <span>Password</span>{required}
          </label>
          <input
            type="password"
            id="password"
            placeholder="Test@123"
            {...register("password")}
          />
          {errors.password && <small className="err">{errors.password.message}</small>}
        </div>
        <button type="submit">Submit</button>
        <Link href='/register' className="link-page">Do not Have An Account? Click Here.</Link>
      </form>
    </div>
  );
};

export default LoginForm;