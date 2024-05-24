import React, { useEffect, useState } from 'react'
import checkOut from '../../assets/images/icon/checkout.png'
import '../../css/cilentside/checkout.css' 
import axios from 'axios'

    


function CheckoutPage({userData}) {

  const [ids , setIds] = useState([])
  const [discount , setDiscount] = useState()

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  useEffect(()=>{
    axios.get(`https://shop-vista-backend.onrender.com/order/product/${userData}`).then((res)=>{
      console.log(res.data.data.map(item => formatter.format(item.discount)))
      setDiscount(res.data.data.map(item => formatter.format(item.discount)))
      const products = res.data.data
      const productsids = products.flatMap(item => item.productIds)
      setIds(productsids )
      // setIds(uniqueProductIds); 
    })
  },[])

  useEffect(() => {
    if (ids && ids.length > 0) {   // Convert the ids array into a comma-separated string
      axios.get(`https://shop-vista-backend.onrender.com /products/all/${ids}`).then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.error('Error fetching products:', error);
      });
    }
  }, [ids]);

  console.log(ids)

  // useEffect(() => {
  //   const hideImage = setTimeout(() => {
  //     // After 5 seconds, hide the image by setting its display to 'none'
  //     const image = document.querySelector('.checkout-image');
  //     if (image) {
  //       image.style.display = 'none';
  //     }
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   // Clear the timeout to prevent it from running if the component unmounts or rerenders
  //   return () => clearTimeout(hideImage);
  // }, []);

  return (
      <div className="checkout-page">
         <img className="checkout-image" src={checkOut} alt="" /> 
         {/* {ids.map(id => <span key={id}>
          <ul><li>{id}</li></ul>
         </span>)}
         {
          discount
         } */}
      </div>
  )
}

export default CheckoutPage