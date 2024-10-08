import { TransTitle } from "@/types";
import { IoCloseOutline } from "react-icons/io5";


const TransactionForm: React.FC<TransTitle> = ({ title, options, submitValue, register, errors, setIsOpen, reset }): JSX.Element => {
  const required = <small style={{ color: 'red' }}>*</small>
  const handleClose = () => { setIsOpen(null), reset() };

  return (
    <div className="modal-form">
      <span className="close" onClick={handleClose}>
        <IoCloseOutline />
      </span>
      <p className="form-title">Add <span className="primary-color">{title}</span></p>
      <form onSubmit={submitValue}>
        <div className="form-group">

          <label htmlFor="name">
            Name{required}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <small className="err">{errors.name.message}</small>}

        </div>

        <div className="form-group">

          <label htmlFor="amount">
            Amount{required}
          </label>
          <input
            type="number"
            id="amount"
            {...register('amount')}
          />
          {errors.amount && <small className="err">{errors.amount.message}</small>}

        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date{required}
          </label>
          <input
            type="date"
            id="date"
            max={new Date().toISOString().split("T")[0]}
            {...register('date')}
          />
          {errors.date && <small className="err">{errors.date.message}</small>}

        </div>
        <div className="form-group">
          <label htmlFor="tag">
            Type{required}
          </label>
          <select id="tag" {...register("tag")}>
            <option hidden value={''}>Please Select</option>
            {
              options.map((item) => <option key={item} value={item}>{item}</option>)
            }
          </select>
          {errors.tag && <small className="err">{errors.tag.message}</small>}
        </div>
        <button type="submit">Add {title}</button>
      </form>
    </div>
  );
};
export default TransactionForm;