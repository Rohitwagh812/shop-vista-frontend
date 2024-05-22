import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'; 
import Img from '../../assets/images/Sing.jpg';  //../assets/images/login.png
import '../../css/sellerside/signin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
 
  const [email , setEmail] =  useState('')
  const [password , setPassword] =  useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault();

       await axios.post('https://shop-vista-backend.onrender.com/seller/login', {email:email , password:password})
       .then(result =>{
        console.log(result.data.message)
        if(result.data.message === "Success"){
          alert("login " +  result.data.message)
          navigate('/dash')
        } else {
          alert("Seller Your Data Not Valid")
          navigate('/reg')
        }
       })
    
console.log('button click')
  }
 


  return (
    <div className='signin-page'>

      <Row>
        <Col lg={6}>
        <div className="left-side">
          <div className="container-div">
            <img src={Img} alt="" />
            <Button className='signin-btn' onClick={()=>{navigate('/signin')}} > Go To Shopper Login </Button>
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
                  <input className='user-email' type="email" name="email" value={email} onChange={(e)=> setEmail(e.currentTarget.value)} />
                 
                  <label htmlFor=""> Enter Your Password</label>
                  <input className='user-password' type="password" name="password" value={password} onChange={(e)=> setPassword(e.currentTarget.value)}/>
                
                  <Button className='login-btn' onClick={handleLogin} > Shopper Login </Button>

                  <a className='login-span' onClick={()=>{navigate('/reg')}} > Create Account </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Signin