import React, { useState } from 'react';

import { Button, Col, Row } from 'react-bootstrap'; 

import Img from '../../assets/images/login.png'; 

import '../../css/cilentside/login.css'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const API = 'https://shop-vista-backend.onrender.com/'


function Signup() {

 const [name , setName] = useState('')
 const [email , setEmail] = useState('')
 const [password , setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please provide all required information.");
      return; 
  }
    // try {
       await axios.post('https://shop-vista-backend.onrender.com/signup', { name, email , password })
       .then(result => {console.log(result)
        navigate('/signin')
      })
      .catch(err => console.log(err))
       
    
  };
 
  const navigate = useNavigate()

  return (
    <div className='signup-page'>

      <Row>
        <Col lg={6}>
          <div className="left-side">
            <div className="container-div">
              <img src={Img} alt="" />
              <Button className='signup-btn' onClick={()=>{navigate('/login')}} > Go To  Seller Login </Button>
            </div>
          </div>  
        </Col>
        <Col lg={6}>
          <div className="right-side">
            <div className="signup-form"> 
                <p>
                  Login and Start Shopper From your favorite brands. Refer a friend and save 50% OFF
                </p>

                  <label htmlFor=""> Enter Your name</label>
                  <input className='user-email' type="name" name="name" value={name} onChange={(e)=> setName(e.currentTarget.value)} />
                 
                  <label htmlFor=""> Enter Your Email</label>
                  <input className='user-email' type="email" name="email" value={email} onChange={(e)=> 
                    setEmail(e.currentTarget.value)}/>

                  <label htmlFor=""> Enter Your Password</label>
                  <input className='user-password' type="password" name="password" value={password} onChange={(e)=> setPassword(e.currentTarget.value)} />
                
                  <Button className='login-btn' onClick={handleSubmit}> Create Account </Button>

                  <a className='login-span' onClick={()=>navigate('/signin')} > Login </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Signup