import React, { useEffect } from 'react';

import { Carousel ,Row , Col , Button } from 'react-bootstrap';

import CarouselOne from '../assets/images/home/Carousel1.png';

import CarouselTwo from '../assets/images/home/Carousel2.png';

import CarouselThree from '../assets/images/home/Carousel3.png';

import LogoOne from '../assets/images/home/icon/10.png';

import LogoTwo from '../assets/images/home/icon/11.png';

import LogoThree from '../assets/images/home/icon/12.png';

import LogoFour from '../assets/images/home/icon/13.png';

import LogoFive from '../assets/images/home/icon/14.png';

import LogoSix from '../assets/images/home/icon/15.png';

import '../css/Home.css'

import {  useNavigate } from 'react-router-dom';
import Axios  from 'axios';
import Cookies from 'js-cookie'



function Home() {

  const navigate = useNavigate()
  // const cookieValue = Cookies.get('token');
  // console.log(cookieValue);

  // axios.defaults.withCredentials = true;
  useEffect(()=>{
    const handleSubmit = async () =>{
      try{
       await Axios.get('https://shop-vista-backend.onrender.com/home').then(result =>{
          // console.log(result)
          if(result.data === "The token was not availabe"){
                // navigate('/')
          } else if(result.data === "Successs"){
            navigate('/home')
            console.error("Invalid response:", result.data);
          } else {
            // navigate('/signin')
            
          }
    }).catch(err => console.log(err))
  
      } catch(err){
        console.log(err)
      }
    }
// this good use this code in app.jsx page good by rohit
    handleSubmit()
  },[])

  useEffect(()  =>{
    Axios.get('https://shop-vista-backend.onrender.com/current').then((res)=>{
    //  console.log(res) 
 })
 },[])

  return (
    <div className='home-page'>
    <Carousel>
    <Carousel.Item>
       <Row> 
        <Col  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} lg={6}>
      <div style={{padding:50}}> 
      <h1 style={{ fontWeight:700}}>  <i>SHOP WITH UTMOST</i> </h1>
          <h1 className='style' style={{ fontWeight:700 , color:"#0277BD"}}> <i>STYLE</i></h1>
          <h3 style={{marginBottom:20}}> Shop from the Latast trendy Clothes to the best gabgets. With star shopper you  save 10% every time you shop </h3>
         <div style={{marginBottom:20}}>
         <Button style={{width:250}} onClick={()=>{navigate('/prod')}}>Browse Products</Button>
         </div>
         <div>
           <h4>Products Are Available From :</h4>
           <img src={LogoOne} style={{height:50}} alt="" />
           <img src={LogoTwo} style={{height:50}} alt="" />
           <img src={LogoThree} style={{height:50}} alt="" />
           <img src={LogoFour} style={{height:50}} alt="" />
           <img src={LogoFive} style={{height:50}} alt="" />
           <img src={LogoSix} style={{height:50}} alt="" />
         </div>
        </div>
        </Col>
        <Col lg={6} style={{display:"flex", justifyContent:"end"}}>
        <img src={CarouselOne} style={{height:'89.8vh'}} alt="" />
        </Col>
       </Row>
      </Carousel.Item>   
         <Carousel.Item>
       <Row>
        <Col  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} lg={6}> 
        <div style={{padding:50}}>
          <h1 style={{ fontWeight:700}}>  <i>SHOP WITH UTMOST</i> </h1>
          <h1 className='style' style={{ fontWeight:700}}> <i>STYLE</i></h1>
          <h3 style={{marginBottom:20}}> Shop from the Latast trendy Clothes to the best gabgets. With star shopper you  save 10% every time you shop </h3>
         <div style={{marginBottom:20}}>
         <Button style={{width:250}} onClick={()=>{navigate('/prod')}}>Browse Products</Button>
         </div>
         <div>
         <h4>Products Are Available From :</h4>
           <img src={LogoOne} style={{height:50}} alt="" />
           <img src={LogoTwo} style={{height:50}} alt="" />
           <img src={LogoThree} style={{height:50}} alt="" />
           <img src={LogoFour} style={{height:50}} alt="" />
           <img src={LogoFive} style={{height:50}} alt="" />
           <img src={LogoSix} style={{height:50}} alt="" />
         </div>
        </div>
        </Col>
        <Col lg={6} style={{display:"flex", justifyContent:"end", marginTop:10}}>
        <img src={CarouselTwo} style={{height:'89.8vh'}} alt="" />
        </Col>
       </Row>
      </Carousel.Item>    
        <Carousel.Item>
       <Row>
        <Col  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} lg={6}>
        <div style={{padding:50}}>
        <h1 style={{ fontWeight:700}}>  <i>SHOP WITH UTMOST</i> </h1>
          <h1 className='style' style={{ fontWeight:700}}> <i>DISCOUNT</i></h1>
          <h3 style={{marginBottom:20}}> Shop from the Latast trendy Clothes to the best gabgets. With star shopper you  save 10% every time you shop </h3>
         <div style={{marginBottom:20}}>
         <Button style={{width:250}} onClick={()=>{navigate('/prod')}}>Browse Products</Button>
         </div>
         <div>
         <h4>Products Are Available From :</h4>
           <img src={LogoOne} style={{height:50}} alt="" />
           <img src={LogoTwo} style={{height:50}} alt="" />
           <img src={LogoThree} style={{height:50}} alt="" />
           <img src={LogoFour} style={{height:50}} alt="" />
           <img src={LogoFive} style={{height:50}} alt="" />
           <img src={LogoSix} style={{height:50}} alt="" />
         </div>
        </div>
        </Col>
        <Col lg={6} style={{display:"flex", justifyContent:"end"}}>
        <img src={CarouselThree} style={{height:'89.8vh'}} alt="" />
        </Col>
       </Row>
      </Carousel.Item>
    </Carousel>

    </div>
  )
}

export default Home