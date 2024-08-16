'use client'
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";

interface TransTitle {
  title: string;
  options: string[];
}

const TransactionForm: React.FC<TransTitle> = ({ title, options }): JSX.Element => {
  return (
    <div className="form-container">
      <p className="form-title">Log In on <span className="primary-color">{title}</span></p>
      <form onSubmit={() => console.log("Hello")}>
        <div className="form-group">

          <label htmlFor="name">
            Name</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">

          <label htmlFor="amount">
            Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"

            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Test@123"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">
            Tag
          </label>
         <select >
          <option value="">op1</option>
         </select>
        </div>
        <button>{title}</button>
      </form>
    </div>
  );
};
export default TransactionForm;