import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table , Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import '../../css/cilentside/cartprod.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {faRotateRight} from '@fortawesome/free-solid-svg-icons'
import api from '../../api'



function Cart({ userData }) {


  const navigate = useNavigate()


  const [promoCode, setPromoCode] = useState('');
  const [validationMessage, setValidationMessage] = useState(''); 
  const [promoCodes, setPromoCodes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [result , setResult] = useState('');
  const [discountedPrice , setDiscountedPrice] = useState('')
  const [promoCodesUsed, setPromoCodesUsed] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [cartItems , setCartItems] = useState([]) 
  const [order , setOrder] = useState([]) 
  // const [productId , setProductId] =useState('')



  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
  
  
useEffect(() =>{
    const getCartProduct = async() =>{
      await  api.get(`/product/cart/${userData}`).then(res =>{
        console.log(res.data.data?.map(item => item._id));
          // setProductId(res.data.data?.map(item => item._id));
          setCartItems(res.data.data)
        })
    }
    getCartProduct()
},[])




useEffect(() => {
  let tempPrice = 0;
  let tempQuantity = 0;
 
  cartItems.forEach((item) => { 
    tempPrice += item.quantity * item.price;
    tempQuantity += item.quantity;
  });
 
  setTotalPrice(tempPrice);
  setTotalQuantity(tempQuantity);
}, [cartItems]);

  const generatePromoCode = () => {

    const length = 8; 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let results = ''

    const discountPercentage = Math.floor(Math.random() * 14) + 10;

    // Append the discount percentage to the promo code
    results += discountPercentage + '%';
    

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    

    

    

 
    setIsRotating(true); 
    setTimeout(() => {
      setResult(results)
      setPromoCodes(result); 
      setIsRotating(false)
    }, 1000);
  

  }
  useEffect(()=>{
    generatePromoCode ()
  },[])

 
 
  const handleInputChange = (event) => {
    setPromoCode(event.target.value);
  };
 
  const handleApplyButtonClick = () => { 

    if (promoCodesUsed.includes(promoCode)) {

      setValidationMessage('Promo code already used');

      setPromoCode('')

    } else if (promoCode === promoCodes ) {

      setValidationMessage('Promo code applied successfully!');
      
      
      setPromoCode('')
      
      setPromoCodesUsed([...promoCodesUsed, promoCode]);
      
      const discountPercentage = parseFloat(result);  
    
      const discountedPrices = (totalPrice * discountPercentage * 84 / 100) - totalPrice ;
      
    
    setDiscountedPrice(discountedPrices);
    
  } else {
     
      setValidationMessage('Promo code not valid');
      setPromoCode('')
   
    } 
    
    setTimeout(() => {
     
      setValidationMessage('');
      
    }, 3000);
  };
  // console.log(promoCodes) 


  const deleteAllCartProducts = async () => {
    try {
      const response = await axios.delete(`https://shop-vista-backend.onrender.com/delete/allcartproducts/${userData}`);
      console.log(response.data.message); 
      if(response.data.message !== 'All cart product deleted successfully'){
        setCartItems([])
      }
    } catch (error) {
      console.error('Error deleting cart products:', error);
    }
  };

  

  const handleDeleteSingleProduct = async (id) =>{ 

    try {
      const result = await axios.delete(`https://shop-vista-backend.onrender.com/delete/single/product/${id}`);
      console.log(result.data.message);
  
      if (result.data.message !== 'product delete') {
        // Remove the deleted product from cartItems
        setCartItems(prevCartItems =>{
          const updatedCartItems = prevCartItems.filter(item => item._id !== id);
          console.log(updatedCartItems); 
          return updatedCartItems;
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  
  }

  const handleorderdone = async () =>{


    try {
      const response = await axios.delete(`https://shop-vista-backend.onrender.com/delete/allcartproducts/${userData}`);
      console.log(response.data.message); 
      if(response.data.message !== 'All cart product deleted successfully'){
        setCartItems([])
        
      }
    } catch (error) {
      console.error('Error deleting cart products:', error);
    }

    const orderPage = {
      userId:userData ,
      productId: cartItems?.map(item => item._id).toString(),
      discount: discountedPrice.toString()
    };

    console.log(orderPage)

    const result = await axios.post(`https://shop-vista-backend.onrender.com/order/product` , orderPage )
        console.log(result.data)
        if(result.data.message === 'Order placed successfully'){
        navigate('/checkout')

      }
      setOrder(result.data)

       return result.data
       
  }

  // console.log(cartItems.forEach(item => {item._id}))
  // console.log(cartItems.map(item => item._id));

  // useEffect(()=>{
  //   setOrder(cartItems.forEach(item => {
  //     console.log(item._id)
  // }))
  // } ,[])
 

  return (
    <div className='cart-product-pege'> 
      <div className="left-cart-side">
        <div className="top-section">
        <h4> Cart <span>{cartItems.length} product</span> </h4>
           <Button className='clear-btn' onClick={deleteAllCartProducts}> Clearcart </Button>
        </div>
        <div className="center-section">
          <Table>
          <thead >
              <tr className='thend-one'>
                <th className='product-th'>Product</th>
                <th className='counts'>Count</th>
                <th >Price</th>
              </tr>
            </thead>
          </Table>

          <Table style={{ width:"40vw"}}>
                  <tbody className='item'>
                  {cartItems.map((item) =>{
                return (
                  <tr className='cards' key={item._id}> 
                  <td className='image-td'><img src={item.image} alt="" /></td>
                       <td className='title'>{item.title.substring(0, 21)} <span>   
                        {item.category}
                        </span> </td>
                     <div className='buttons'> 
                        <td  className='count-td'>
                           {item.quantity} 
                        </td> 
                     </div>
                    <td className='price-th' > {formatter.format(item.price *84)} </td> 
                     <td>
                      <div className="icon-container" onClick={()=> handleDeleteSingleProduct(item._id)}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#fa0505" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                      </div>
                    </td> 
                  </tr>
                );
                  })}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="right-cart-side">
         <div className="promo-code">
          <h5>Promo Code</h5>
         <div className="input-div">
         <input placeholder='Type here....' type="text" value={promoCode} onChange={handleInputChange} />
           <Button className='apply-btn' onClick={handleApplyButtonClick}>Apply</Button> 
         </div>
         {/* <h6 >{promoCodes} <span> {result} OFF</span></h6> */}
            <div className="code-div">
                <h6  style={{ textDecoration: promoCodesUsed.includes(promoCodes) ? 'line-through' : 'none' }}>{promoCodes} <span style={{ textDecoration: promoCodesUsed.includes(promoCodes) ? 'line-through' : 'none' }}> {result + '  OFF'} </span>
                  </h6>
            </div>
         <FontAwesomeIcon onClick={generatePromoCode} className={isRotating ? 'icon-icon rotate-360' : 'icon-icon'} icon={faRotateRight} />
        
         
         </div>
         <div className="total-price">
           <h6 className='h6'> Subtotal <span> {formatter.format(totalPrice * 84)} </span> </h6>
           <h6 className='h6'> Discount <span> {formatter.format(discountedPrice)} </span> </h6>
           <h6 className='total-price-htag'> Total <span> {formatter.format(totalPrice *84 - discountedPrice)} </span> </h6>
           <Button className='checkout-btn' onClick={handleorderdone}>Continue to checkout</Button>
         </div>
      </div>
      
         {validationMessage && ( <p  className={validationMessage.includes('not valid') || validationMessage.includes('already used') ? 'red-text' : 'green-text'}> {validationMessage} </p> )}
    </div>
  )
}


export default Cart