import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({ title, btnText, amt, operation }): JSX.Element => {
  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amt);
  const getColor = (title: string) => {
    if (title.toLowerCase() === 'total income') return 'rgb(20, 200, 50)';
    if (title.toLowerCase() === 'total expenses') return 'red';
  }

  const handleOperation = () => {
    operation();
  };

  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <p className="amt" style={{ color: `${getColor(title)}` }}> {amount}</p>
      <button className="primary" onClick={handleOperation}>{btnText}</button>
    </div>
  );
};
export default Card;