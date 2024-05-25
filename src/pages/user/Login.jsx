import React, { useEffect, useState } from 'react';

import { Button, Col, Row } from 'react-bootstrap'; 

import Img from '../../assets/images/login.png'; 

import '../../css/cilentside/login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login_Api = 'https://shop-vista-backend.onrender.com/'


function Login() {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  // axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  

  const handleLogin = async  (e) => {
    e.preventDefault();
    // try {
         await axios.post('https://shop-vista-backend.onrender.com/signin' , { email:email , password:password }, { withCredentials: true })
         .then(result => {
          console.log(result)
          if(result.data === 'Success'){
            window.location.reload()
            alert(result.data)
            navigate('/home')

            // navigate('/signup')
          }else{
            alert(" Login " + result.data)
            // navigate('/signup')
          }
         })
  };


  

 
 
  return (
    <div className='login-page'>

      <Row>
        <Col lg={6}>
          <div className="left-side">
            <div className="container-div">
              <img src={Img} alt="" />
              <Button className='signin-btn' onClick={()=>{navigate('/login')}} > Go To  Seller Login </Button>
            </div>
          </div>  
        </Col>
        <Col lg={6}>
          <div className="right-side">
            <div className="login-form"> 
                <p>
                  Login and Start Shopper From your favorite brands. Refer a friend and save 50% OFF
                </p>

                  <label htmlFor=""> Enter Your Email</label>
                  <input className='user-email' type="email" name="email" value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
                 
                  <label htmlFor=""> Enter Your Password</label>
                  <input className='user-password' type="password" name="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
                
                  <Button className='login-btn' onClick={handleLogin}> Shopper Login </Button>

                  <a className='login-span' onClick={()=>navigate('/signup')} > Create Account </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login