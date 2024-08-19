import React from 'react';
import '../Styles/CSS/footer.css';

const Footer = () => {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <p className="footerText">© 2024 FoodWise. All rights reserved.</p>
        <ul className="footerLinks">
          <li><a href="/privacy-policy" className="footerLink">Privacy Policy</a></li>
          <li><a href="/terms-of-service" className="footerLink">Terms of Service</a></li>
          <li><a href="/contact-us" className="footerLink">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
