import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { parseCookies } from "nookies";

const Header:React.FC = ():JSX.Element =>{
  const cookieData = cookies().get("user");
  
  return(
    <div className="navbar">
      <p className="navbar-heading">BudgetBuddy</p>
      {cookieData ? (
        <p className="navbar-link" onClick={()=> console.log("Logout")}>
          <span style={{ marginRight: "1rem" }}>
          
          </span>
          Logout
        </p>
      ) : null}
    </div>
  );
};
export default Header;