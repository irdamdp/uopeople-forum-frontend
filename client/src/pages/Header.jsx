import classes from "./styling/header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../components/alerthelper";
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    showSuccessAlert("LogOut Successful", "Click OK to continue", () => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };
  return (
    <>
      <header className={classes.header}>
        <div className={classes.nav_container}>
          <div className={classes.logo}>
            <span className={classes.logo_text}>
              <img
                src="https://www.uopeople.edu/wp-content/uploads/2022/05/logo-uop.webp"
                alt="UoPeople logo"
              />
            </span>
          </div>
          <nav className={classes.nav_links}>
            <a href="#">Home</a>
            <a href="#">How it Works</a>
            {!token ? (
              <Link to="/login">
                <button className={classes.signin_btn}>SIGN IN</button>
              </Link>
            ) : (
              <button onClick={handleLogout} className={classes.signin_btn}>
                SIGN OUT
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
