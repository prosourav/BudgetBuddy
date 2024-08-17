interface CardProps {
  title: string,
  btnText: string,
  amt: number,
  operation: () => void;
}

const Card: React.FC<CardProps> = ({ title, btnText, amt, operation }): JSX.Element => {

  const handleOperation = () => {
    operation();
  };

  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <p className="amt">₹ {amt}</p>
      <button className="primary" onClick={handleOperation}>{btnText}</button>
    </div>
  );
};
export default Card;