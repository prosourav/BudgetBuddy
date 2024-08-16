import { cookies } from "next/headers";
import Link from "next/link";
import Logout from "./Logout";

const Header: React.FC = (): JSX.Element => {

  let user = cookies().get('token');


  return (
    <div className="navbar">
      <p className="navbar-heading">
        <Link className="link-page logo" href='/'>BudgetBuddy</Link>
      </p>
      {user?.value ? (
       <Logout />
      ) : null}
    </div>
  );
};

export default Header;

