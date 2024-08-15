/* eslint-disable react/no-unescaped-entities */
"use client";
import { doCredentialLogin } from "@/app/actions";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import Link from "next/link";


const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      setError("Check your Credentials");
    }
  }


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
          <button>Submit</button>
          <Link href='/register' className="link-page">Don't Have An Account? Click Here.</Link>
        </form>
      </div>

  );
};

export default LoginForm;
