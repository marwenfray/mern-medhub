import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DoctorData ,AdminData,PatientData} from './SidebarData.js';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useSelector,useDispatch } from 'react-redux';
import {Button } from "reactstrap";
import SigninModal from '../auth/SigninModal'
import SignupModal from '../auth/SignupModal'
import logo from '../../assets/logo.png'
import { logout } from "../../js/actions/authActions";

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducer);
    const isAuth=auth.isAuth
    const userType=auth.user.userType
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
const SidebarData=userType==='doctor'?DoctorData:userType==='admin'?AdminData:PatientData


const authed=<div className ="authed"><div>
<Link to='#' className='menu-bars'>
  <FaIcons.FaBars onClick={showSidebar} />
</Link>
<Button onClick={() => dispatch(logout())} color="light">
                Logout
              </Button>
              
</div>
<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
<ul className='nav-menu-items' onClick={showSidebar}>
  <li className='navbar-toggle'>
    <Link to='#' className='menu-bars'>
      <AiIcons.AiOutlineClose />
    </Link>
  </li>
  {SidebarData.map((item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    );
  })}
</ul>
</nav>

</div>
const unauthed = <div className='btns'>
  <SigninModal className="Btn"/>
  <SignupModal className="Btn"/>
</div>
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
        <Link
            to="/"
          >
            <img className="NavLogo" src={logo}/>
          </Link>
        {isAuth?authed:unauthed}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
