import React, { useContext, useState } from 'react';
import { Form, Button, Nav, Navbar, Image } from 'react-bootstrap';
import { myContext } from '../context/Context';
import axios from 'axios';
import "../home/home.css";
import '../register/RegisterForm.css'
import '../register/PopupMessage'
import PopupMessage from '../register/PopupMessage';
import {Link, useNavigate} from 'react-router-dom'
import { backendUrl } from '../../utils/utils';
import Header from '../home/Header';
import Footer from '../home/Footer';


const RegisterForm = () => {
  const {products} = useContext(myContext)
  const nav = useNavigate()
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
  } = useContext(myContext);
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const submitForm = async () => {
  try {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!username) {
      setUsernameError("Name can't be blank");
      setTimeout(() => {
        setUsernameError('');
      }, 2000); // hide error after 2 seconds
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError("Email can't be blank");
      setTimeout(() => {
        setEmailError('');
      }, 2000); // hide error after 2 seconds
    } else if (!email.match(validRegex)) {
      setEmailError("Invalid email address");
      setTimeout(() => {
        setEmailError('');
      }, 2000); // hide error after 2 seconds
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError("Password can't be blank");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password can't be blank");
      setTimeout(() => {
        setConfirmPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        setTimeout(() => {
          setConfirmPasswordError('');
        }, 2000); // hide error after 2 seconds
      } else {
        setConfirmPasswordError('');
        const response = await axios.post(`${backendUrl}/Users/users`, { username, email, password });

        if (response.status === 201) {
          setPopupMessage("Registration success");
          setTimeout(() => {
            setPopupMessage('');
            setShowPopup('');
            nav('/Login');
          }, 2000); // hide error after 2 seconds
          setShowPopup(true);
        } else {
          setPopupMessage("Registration failed");
          setShowPopup(true);
        }
      }
    }
  } 
 catch (error) {
  console.log(error);
  if (error.response && error.response.data) {
    if (error.response.data.message.includes('username')) {
      setPopupMessage("Username already exists");
    } else if (error.response.data.message.includes('email')) {
      setPopupMessage("Email already exists");
    } else {
      setPopupMessage("Registration failed");
    }
    setShowPopup(true);

    // Hide error message after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  } else {
    setPopupMessage("Error: " + error.message);
    setShowPopup(true);

    // Hide error message after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
}
};


  const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
  const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
  const interval = 3000; // Interval between heading changes (in milliseconds)
  const category=[...new Set(products.map(data=>data.category))]
  return (
    <div className="main1R">
      {/* Header code */}
      <div className="header1H">

      <Header/>

      </div>

      <div className="centerR1" style={{ marginTop: "150px", display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div className="regHeadR" style={{ marginTop: '50px' }}>
          <h2 style={{ fontWeight: 'bold' }}>Register</h2>
        </div>

        <div className="regFormR w-100">
          <Form className="flex flex-col items-center justify-center w-full p-4 sm:px-6 md:px-8 lg:px-10">
            <div className="w-full max-w-md">
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="font-bold">Username</Form.Label>
                <Form.Control
                  className="w-full h-12 border border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {usernameError && <div className="text-red-500">{usernameError}</div>}
              </Form.Group>
            </div>

            <div className="w-full max-w-md">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-bold mt-4">Email address</Form.Label>
                <Form.Control
                  className="w-full h-12 border border-gray-300 rounded-lg"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <div className="text-red-500">{emailError}</div>}
              </Form.Group>
            </div>

            <div className="w-full max-w-md">
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="font-bold mt-4">Password</Form.Label>
                <Form.Control
                  className="w-full h-12 border border-gray-300 rounded-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && <div className="text-red-500">{passwordError}</div>}
              </Form.Group>
            </div>

            <div className="w-full max-w-md">
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label className="font-bold mt-4">Confirm Password</Form.Label>
                <Form.Control
                  className="w-full h-12 border border-gray-300 rounded-lg"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPasswordError && <div className="text-red-500">{confirmPasswordError}</div>}
              </Form.Group>
            </div>

            <div className="flex items-start mt-4 w-full max-w-md">
              <input type="checkbox" className="mr-2" />
              <p className="text-sm">
                I have read the terms and conditions, privacy policy and review guidelines and agree to them.
              </p>
            </div>

            <div className="flex justify-center mt-6 w-full max-w-md">
              <Button onClick={submitForm} variant="dark" className="w-full h-12">
                Register
              </Button>
            </div>
          </Form>

          <div className="flex justify-center mt-6">
            <Link to={'/Login'} className="text-black">
              <h4 className="text-lg font-bold">Already have an account? Login</h4>
            </Link>
          </div>
        </div>

        
      </div>

      {/*  */}

      <div style={{height:'100%',width:'100%'}}>
        <hr />
                    {/* <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>  */}
            </div>
            <div className="footer1H" style={{paddingTop:'100px'}}>

              <Footer/>
                
            </div>
      {showPopup && <PopupMessage message={popupMessage} />}
    </div>
  );
};

export default RegisterForm;

