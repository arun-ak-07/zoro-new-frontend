import React from 'react';
import './home.css';

const Footer = () => {
  return (
    <>
      <div className="footer1a bg-black">
        <div className="leftFooter1z">
          <div className='pr-20 locDiv'>
            <h4 className="h4 location font-bold md:text-center">LOCATION</h4>
          </div>
          <div className="custom-text custom-textsz md:items-center px-10">
            <p className="text-sm tracking-wider">24-A New India Colony,<br />Marine Drive Kochi,<br />683106 Kerala</p>
            <p className="text-sm tracking-wider">
              <b>Email</b><a href="mailto:support@zoro.in"> :support@zoro.in</a>
            </p>
          </div>
        </div>

        <div className="centerFooter1">
          <div>
            <h4 className="h4 font-bold">INFORMATION</h4>
          </div>
          <div className="pr-14 aboutUS">
            <ul>
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="/pages/contact-us">Contact Us</a></li>
              <li><a href="/pages/bulk-order">Bulk Order</a></li>
            </ul>
          </div>
        </div>

        <div className="rightFooter1">
          <div>
            <h4 className="h4 font-bold">CUSTOMER SERVICES</h4>
          </div>
          <div className="customService pr-2 md:pr-0 sm:pr-0">
            <ul>
              <li><a href="#" className="text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-white">Return and Replace Policy</a></li>
              <li><a href="#" className="text-white">Cancellation Policy</a></li>
              <li><a href="#" className="text-white">Return and Replace Portal</a></li>
              <li><a href="#" className="text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footBottom1 ">
        <p className="text-xs font-poppins text-white">© 2024 ZORO All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
