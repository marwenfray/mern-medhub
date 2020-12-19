import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    
      <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="/"> medhub.com </a>
      </div>
    
  );
}

export default Footer;
