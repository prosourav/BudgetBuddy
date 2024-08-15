'use client'
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";

const RegisterForm: React.FC = (): JSX.Element => {
  return (
    <div className="form-container">
      <p className="form-title">Log In on <span className="primary-color">BudgetBuddy</span></p>
      <form onSubmit={() => console.log("Hello")}>
        <div className="form-group">

          <label htmlFor="name">
            <FaRegUser /> <span>Name</span></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">

          <label htmlFor="name">
            <FaRegUser /> <span>Email</span></label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="john@example.com"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <TbPasswordFingerprint /> <span>Password</span></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Test@123"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <TbPasswordFingerprint /> <span>Confirm Password</span></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Test@123"
            required
          />
        </div>
        <button>Submit</button>
        <Link href='/login' className="link-page">Have An Account? Click Here.</Link>
      </form>
    </div>
  );
};
export default RegisterForm;