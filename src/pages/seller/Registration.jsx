import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
// import LeftImage from '../assets/images/Sing.jpg';
import '../../css/sellerside/signin.css'
import Img from '../../assets/images/Sing.jpg'; 
import axios from 'axios';


function Registration() {

  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
    

  const navigate = useNavigate()

  const handleclick = async (e) =>{
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please provide all required information.");
      return; 
  }
    // try {
       await axios.post('https://shop-vista-backend.onrender.com/seller/signup', { name, email , password })
       .then(result => {console.log(result)
         alert('helo')
        navigate('/login')
      })
      .catch(err => console.log(err))
       
    
  };

  return (
  <div className='registration-page'>

    <Row>
      <Col lg={6}>
        <div className="left-side">
          <div className="container-div">
            <img src={Img} alt="" />
            <Button className='signup-btn'  > Go To Shopper Login </Button>
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
                <input className='user-eemail' type="name" name="name" value={name} onChange={(e)=> setName(e.currentTarget.value) } />
               
                <label htmlFor=""> Enter Your Email</label>
                <input className='user-email' type="email" name="email" value={email} onChange={(e)=> setEmail(e.currentTarget.value) } />

                <label htmlFor=""> Enter Your Password</label>
                <input className='user-password' type="password" name="password" value={password} onChange={(e)=> setPassword(e.currentTarget.value) } />
              
                <Button className='login-btn' onClick={handleclick} > Create Account </Button>

                <a className='login-span' onClick={()=>navigate('/login')} > Login </a>
          </div>
        </div>
      </Col>
    </Row>
  </div>
)
}
export default Registration