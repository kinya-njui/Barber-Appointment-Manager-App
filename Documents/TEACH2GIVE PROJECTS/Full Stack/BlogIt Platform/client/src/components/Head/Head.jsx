import React from 'react'
import './Head.css'
import { Link } from "react-router-dom";
import{toast} from 'sonner'
import{useNavigate} from "react-router-dom"


function Head() {
  return (

    <div className="nav-bar">
    <h3 className="header-tittle">BlogIt</h3>
    <nav>
    <ol className="navigationlist">
        <li>
        <Link to="/">home</Link>
        </li>
        <li>
          <Link to="">write</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/login">logout</Link>
        </li>
      </ol>
    </nav>
  </div>
);
}
function Header() {
return (
  <header>
    <NavbarHead />

  </header>
);
}
  

export default Head