'use client'
import { RegisterFormProps } from "@/types";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";


const RegisterForm: React.FC<RegisterFormProps> = ({ submitValue, register, errors }): JSX.Element => {
  const required = <small style={{ color: 'red' }}>*</small>
  return (
    <div className="form-container">
      <p className="form-title">Sign Up on <span className="primary-color">BudgetBuddy</span></p>
      <form onSubmit={submitValue}>
        <div className="form-group">

          <label htmlFor="name">
            <FaRegUser size={20} /> <span>Name</span>{required}</label>
          <input
            type="text"
            id="name"
            placeholder="John"
            {...register('name')}
          />
          {errors.name && <small className="err">{errors.name.message}</small>}

        </div>

        <div className="form-group">

          <label htmlFor="email">
            <MdOutlineEmail size={20} /> <span>Email</span>{required}</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="john@example.com"
          />
          {errors.email && <small className="err">{errors.email.message}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <TbPasswordFingerprint size={20} /> <span>Password</span>{required}</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Test@123"
          />
          {errors.password && <small className="err">{errors.password.message}</small>}

        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">
            <TbPasswordFingerprint size={20} /> <span>Confirm Password</span>{required}</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Test@123"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <small className="err">{errors.confirmPassword.message}</small>}

        </div>
        <button>Submit</button>
        <Link href='/login' className="link-page">Have An Account? Click Here.</Link>
      </form>
    </div>
  );
};
export default RegisterForm;