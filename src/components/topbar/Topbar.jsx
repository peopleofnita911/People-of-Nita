import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="top">
      <div className="topLeft">
        PeopleOfNITA
      </div>
      
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img 
              className="topImg" 
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.username}`} 
              alt="User" 
            />
          </Link>
        ) : null}
        
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      <div className={`topCenter ${menuOpen ? 'open' : ''}`}>
        <ul className="topList">
          <li className="topListItem" onClick={() => setMenuOpen(false)}>
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem" onClick={() => setMenuOpen(false)}>
            <Link className="link" to="/">ABOUT</Link>
          </li>
          <li className="topListItem" onClick={() => setMenuOpen(false)}>
            <Link className="link" to="/">CONTACT</Link>
          </li>
          {user && user.role === "admin" && (
            <li className="topListItem" onClick={() => setMenuOpen(false)}>
              <Link className="link" to="/write">WRITE</Link>
            </li>
          )}
          {user ? (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          ) : (
            <>
              <li className="topListItem" onClick={() => setMenuOpen(false)}>
                <Link className="link" to="/login">LOGIN</Link>
              </li>
              <li className="topListItem" onClick={() => setMenuOpen(false)}>
                <Link className="link" to="/register">REGISTER</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}