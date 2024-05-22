import React from 'react';

import { Button, Col, Row } from 'react-bootstrap';

import '../css/main.css'

import LeftImage from '../assets/images/Sing.jpg';

import ShopImage from '../assets/images/login.png'

import { useNavigate } from 'react-router-dom';

function Main() {

  const navigate = useNavigate()

  return (
    <div className='main-page'>
        {/* <Container> */}
            <Row>
                <Col> 
                  <div className="left-side">
                    <div className="container-div">
                       <img src={LeftImage} alt="" />
                       <Button className='signin-btn' onClick={()=>{navigate('/signin')}} > Shopper Signin </Button>
                    </div>
                  </div>  
                </Col>
                <Col>
                  <div className="right-side">
                    <div className="container-div">
                        <img src={ShopImage} alt="" />
                        <Button className='signin-btn' onClick={()=>{navigate('/login')}}>  Seller Signin </Button>
                    </div>
                  </div>
                </Col>
            </Row>
        
    </div>
  )
}

export default Main