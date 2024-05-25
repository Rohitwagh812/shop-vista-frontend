import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import Logo from '../src/assets/images/icon/logo.png';
import UserIcon from '../src/assets/images/icon/usericon.png';
import CartIcon from '../src/assets/images/icon/cart.png';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Login from './pages/user/Login';
import Signin from './pages/seller/Signin';
import Registration from './pages/seller/Registration';
import Signup from './pages/user/Signup';
import axios from 'axios';
import Product from './pages/user/Product';
import Cart from './pages/user/Cart';
// import Cookies from 'js-cookie' 
import api from './api'
import CheckoutPage from './pages/user/CheckoutPage';
import Dashboard from './pages/seller/Dashboard';
import { Edit, User } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import Editpage from './pages/seller/Editpage';
import Newprod from './pages/seller/Newprod';
 
function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  const [user ,setUser] = useState()
  const [userTwo ,setUserTwo] = useState()
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup' || 
  location.pathname === '/login' || location.pathname === '/reg' || location.pathname === '/dash' || location.pathname === '/editprod' || location.pathname === '/newprod'; 

  const hideNavbarTwo = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/reg'  || location.pathname === '/home' || location.pathname === '/cart'|| location.pathname === '/checkout' || location.pathname == '/prod'

  const [userData, setUserData] = useState();
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response =
           const res = await axios.get('https://shop-vista-backend.onrender.com/current', { withCredentials: true })
         
              console.log(res.data.id)
              setUserData(res.data.id); 
        //  })
        
      } catch (error) {
        console.error('Error fetching user data:', error); 
      }
    };

    fetchUserData();
  }, []); 

  useEffect(() =>{
    const getCartProduct = async() =>{
      await  axios.get(`https://shop-vista-backend.onrender.com/product/cart/${userData}` , { withCredentials: true }).then(res =>{
          // console.log(res.data.data)
          setCartItems(res.data.data)
        })
    }
    getCartProduct()
},[cartItems]) 


  useEffect(()=>{
    const handleSubmit = async () =>{
      try{
       await axios.get('https://shop-vista-backend.onrender.com/home' , { withCredentials: true }).then(result =>{
          // console.log(result) 
          if(result.data !== "Success"){
            navigate('/home')
            setUser(true)
            console.error("Invalid response:", result.data);
          } else {
            // navigate('/signin') 
            setUser(false)
          }

          // console.log(result.data !== "Successs")
        

    }).catch(err => console.log(err))
  
      } catch(err){
        console.log(err)
      }
    }

    handleSubmit()
  },[])
 

  // console.log(currentUser)const LogoutButton = () => {
    const handleLogout = async () => {
      try {
          await axios.post('https://shop-vista-backend.onrender.com/logout' , { withCredentials: true });
          alert('user has be logout')
          setUser(false)
      } catch (error) {
          // Handle error
          console.error("Error logging out:", error);
      }
  }; 

  const handleLogoutTwo = async () => {
    try {
        await axios.post('https://shop-vista-backend.onrender.com/seller/logout' , { withCredentials: true }).then((res)=>{
          console.log(res.data)
          if(res.data.message === 'Logged out successfully'){
            navigate('/login')
            console.log('ok')
          }
        })
        alert('user has be logout')
        setUserTwo(false)
    } catch (error) {
        // Handle error
        console.error("Error logging out:", error);
    }
};
// console.log(userData)

  return (
    <div className="app-page" style={{overflow:'hidden'}}>
      {!hideNavbar && (
        <div className="main">
          <Navbar href='/' bg="primary" data-bs-theme="dark">
            <Container className='container'>
              <Navbar.Brand onClick={()=>{navigate('/home')}} style={{ display: 'flex', alignItems: 'center', cursor:'pointer'}}>
                <img
                  alt=""
                  src={Logo}
                  width="40"
                  height="40"
                  className="d-inline-block align-center"
                />
                <h4>Shop Vista</h4>
              </Navbar.Brand>
              <div className='right-div'>
                <Nav className="me-auto right-nav-div">

                    {
                      user && <div>
                        <ShoppingCart style={{cursor:"pointer"}}  width="35" height="35" className="cart-icon d-inline-block align-center" onClick={()=> navigate("/cart")}  />{cartItems.length > 0 
                       && ( <Badge  >{cartItems.length}</Badge>)
                      }
                        {/* <img src={CartIcon} alt=""
                      width="40"
                      height="40"
                      className="cart-icon d-inline-block align-center" 
                      onClick={()=> navigate("/cart")}/>  {cartItems.length > 0 
                       && ( <Badge  >{cartItems.length}</Badge>)
                      } */}
                      </div>
                    }
                    <User style={{cursor:"pointer"}} width="35" height="35" className="user-icon d-inline-block align-center" />
                    
                  {/* <img src={UserIcon} alt=""
                    width="40"
                    height="40"
                    className="user-icon d-inline-block align-center" /> */}
                  {user ? <Button variant="light" className='login-btn' onClick={handleLogout}> Logout </Button> : <Button variant="light" className='login-btn' onClick={navigate('/signin')}> Login </Button>} 
                  {/* <Button variant="light" className='login-btn'> Logout </Button> */}
                </Nav>
              </div>
            </Container>
          </Navbar>
        </div>
        
      )}

      {
        !hideNavbarTwo && (
          <div className="main">
              <Navbar href='/dash' bg="primary" data-bs-theme="dark">
              <Container className='container'>
                  <Navbar.Brand onClick={()=>{navigate('/dash')}} style={{ display: 'flex', alignItems: 'center', cursor:'pointer'}}>
                      <img
                        alt=""
                        src={Logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-center"
                      />
                      <h4>Shop Vista</h4>
                     </Navbar.Brand>
                   <div className='right-div'>
                     <Nav className="me-auto right-nav-div">
                   
                    <User style={{cursor:"pointer"}} width="35" height="35" className="user-icon d-inline-block align-center" />
                    
                   <Button variant="light" className='login-btn' onClick={handleLogoutTwo}> Logout </Button> 
                    {/* <Button variant="light" className='login-btn' onClick={navigate('/signin')}> Login </Button> */}
                  {/* <Button variant="light" className='login-btn'> Logout </Button> */}
                    </Nav>
                     </div>
                   </Container>
               </Navbar>
             </div>
        )
      }

      <div className="rohit-div">
        Developer By Rohit
      </div>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/home'} element={<Home />} />
        {/* user */}
        <Route path={'/signin'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/Prod'} element={<Product userData={userData}/>} />
        <Route path={'/cart'} element={<Cart userData={userData}/>} /> 
        <Route path={'/checkout'} element={<CheckoutPage userData={userData}/>} /> 
        
        {/* seller */}
        <Route path={'/login'} element={<Signin />} />
        <Route path={'/reg'} element={<Registration />} />
        <Route path={'/dash'} element={<Dashboard />} />
        <Route path={'/editprod'} element={<Editpage />} />
        <Route path={'/newprod'} element={<Newprod />} />
  
      </Routes>
    </div>
  )
}

export default App;
