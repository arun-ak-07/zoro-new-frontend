import React, { useContext, useState } from 'react';
import { Navbar, Nav, Form, Button,} from 'react-bootstrap';
import "../home/home.css"
import { myContext } from '../context/Context';
import '../login/login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../../utils/utils';
import {toast} from 'react-hot-toast'
import Header from '../home/Header';
import Footer from '../home/Footer';

const Login = () => {
    const { banBtn, loginEmail, setLoginEmail, loginPassword, setLoginPassword, products } = useContext(myContext)
    const nav = useNavigate()


    console.log(banBtn)
    const loginForm = async () => {
        try {
            if (loginEmail === "admin123@gmail.com" && loginPassword === "Admin@12") {
                toast.success("Admin Login successfull")
                nav('/AdminManagement')
            }
            else {
                const response = await axios.post(`${backendUrl}/Users/login`, { email: loginEmail, password: loginPassword }, { withCredentials: true })
                if (response.status === 403) {
                    toast.error("Your account has been banned. Please contact support.");
                } else {

                    const data = response.data
                    console.log("res", response.data)
                    console.log("UserId", data.user._id)
                    console.log("Token in frontEnd", data.token)
                    console.log("userEmail", loginEmail)
                    localStorage.setItem("AuthToken", data.token)
                    localStorage.setItem("userEmail", loginEmail)
                    localStorage.setItem("UserId", data.user._id)
                    setLoginEmail('')
                    setLoginPassword('')
                    toast.success('Login successfull')
                    // setTimeout(() => {
                    //     nav('/')
                    // },1000) 
                    nav('/')
                }

            }
        }
        catch (error) {

            if (error.response && error.response.status === 403) {
                toast.error("Your account has been banned. Please contact support.");
            } else {
                toast.error("Invalid email or password");
            }
            console.log(error);
        }
    }


    return (
        <div className="mainL1">

            <div className="header1H">

                <Header/>
               
            </div>

            <div className="centerR1" style={{ marginTop: "130px", display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                <div className="regHeadR" style={{ marginTop: '50px' }}>
                    <h2 style={{ fontWeight: 'bold' }}>Login</h2>
                </div>

                <div className="loginFormRs w-100">

                <Form className="flex flex-col items-center justify-center w-full p-4 sm:px-6 md:px-8 lg:px-10">

<div className="w-full max-w-md">
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="font-bold mt-2">Email address</Form.Label>
    <Form.Control
      className="w-full h-12 border border-gray-300 rounded-lg"
      type="email"
      placeholder="Enter email"
      name="email"
      onChange={(b) => setLoginEmail(b.target.value)}
      required
    />
  </Form.Group>
</div>

<div className="w-full max-w-md">
  <Form.Group controlId="formBasicPassword">
    <Form.Label className="font-bold mt-5">Password</Form.Label>
    <Form.Control
      className="w-full h-12 border border-gray-300 rounded-lg"
      type="password"
      placeholder="Password"
      name="password"
      onChange={(c) => setLoginPassword(c.target.value)}
      minLength={6}
      required
    />
  </Form.Group>
</div>

<div className="w-full max-w-md flex justify-center mt-5">
  <Button
    className="w-full h-12 bg-gray-900 text-white rounded-lg"
    onClick={loginForm}
    variant="dark"
  >
    Login
  </Button>
</div>
</Form>

                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to={'/RegisterForm'} style={{ color: 'black' }}><h4 style={{
                            fontSize: '18px', fontWeight: 'bold'
                        }}>New user?, Create an account</h4></Link></div>
                </div>

            </div>


            <div style={{ height: '100%', width: '100%' }}>
                <hr />
                {/* <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>  */}
            </div>
            <div className="footer1H" style={{ paddingTop: '100px' }}>

                <Footer/>

            </div>
          
        </div>
    );
};

export default Login;
