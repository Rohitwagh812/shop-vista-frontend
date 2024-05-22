import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import '../../css/sellerside/edit.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Editpage() {

  const location = useLocation()

  const id = location.state

  // console.log(id)
 
  const [title , setTitle] = useState('');
  const [description , setDescription] = useState('');
  const [price , setPrice] = useState('');
  const [discount , setDiscount] = useState('');
  const [category , setCategory] = useState('');
  const [imguri , setImguri] = useState('');
    const [data , setData] = useState([])
    const [updateProd , setUpdateProd] = useState([])
    const [updateProdtwo , setUpdateProdtwo] = useState([])
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    });

  useEffect(() => {
    console.log('id:', id.id);
    
    if (id) {
      axios.get(`https://shop-vista-backend.onrender.com/products/all/${id.id}`)
        .then((res) => {
          console.log('Response:', res.data.data);
          setData(res.data.data._id)
          setTitle(res.data.data.title)
          setCategory(res.data.data.category)
          setDescription(res.data.data.description)
          setDiscount(res.data.data.discount)
          setPrice(res.data.data.price*84)
          setImguri(res.data.data.image)
        })
        .catch((err) => {
          console.error('Product error:', err);
        });
        
    }
  }, [id]);

  // console.log(data)


  const handleclicktoupdate = () =>{
  
    const updates = {
      title,
      description,
      price:price/84,
      discount:discount,
      category,
      image:imguri
    }

   axios.patch(`https://shop-vista-backend.onrender.com/product/products/${data}` , updates).then(res =>{
    console.log(res.data.data._id)
    setUpdateProd(res.data.data._id)
   })


   setTitle('')
   setCategory('')
   setDescription('')
   setDiscount('')
   setImguri('')
   setPrice('')
    alert('Product Updated Successfully')

  }

    useEffect(()=>{
      axios.get(`https://shop-vista-backend.onrender.com/products/all/${updateProd}`).then(res=>{
        console.log(res.data.data)
        setUpdateProdtwo(res.data.data)
      })
},[])

   
 
  return (
    <div className='edit-page'>
       <Row>
         <Col lg={6}>
            <div className="left-div">
              <div className="inputs">
                <input type="text" value={title} onChange={(e)=> setTitle(e.currentTarget.value)} placeholder='product title' />

                <textarea value={description} onChange={(e)=> setDescription(e.currentTarget.value)} placeholder='product Description'></textarea>

                 <div className="joint-input">
                    <input value={price} onChange={(e)=> setPrice(e.currentTarget.value)} type="text" placeholder='product price' />

                    <input value={discount} onChange={(e)=> setDiscount(e.currentTarget.value)} type="text" placeholder='product discount' />
                 </div>

                <input value={category} onChange={(e)=> setCategory(e.currentTarget.value)} type="text" placeholder='product category' />

                <input type="text" value={imguri} onChange={(e)=> setImguri(e.currentTarget.value)} placeholder='product image uri'/>
              </div>
              <div className="btn-add-prod">
                <Button className='btn-prod' onClick={handleclicktoupdate}> Update Product </Button>
              </div>
            </div>
         </Col>
         <Col lg={5}>
         <div className="this-right-div">
                 <div className="top-section">
                    <h3>
                        live preview
                    </h3>
                    <p>
                        this is how , your customers will see your product on the website
                    </p>
                 </div>
                 <div className="card-div"> 
                 {
                    title.length === 0  ? (
                        <div></div>
                    ):(
                        <Card className='prod-card'> 
                                <Card.Body>
                                    <Card.Img className='prod-img' src={imguri} /> 
                                    {/* alt={product.title} */}
                                    <Card.Title className='title-text'>{title ? title.substring(0, 15) : 'enter product name'}</Card.Title>
                                    <Card.Text>  
                                        <h5 style={{color:'#0277BD'}}>{formatter.format(price)} <span>
                                        ({discount ? ` ${ discount }%` : 'discount Not Applicable'}) </span> </h5>
                                  </Card.Text>
                                  <Button className='add-to-btn-two' > Add to cart </Button>
                                </Card.Body>
                            </Card>
                    )
                    }
                   
                   {
                    updateProdtwo.length === 0 ? (
                        <div></div>
                    ):(
                        // updateProdtwo.map((product)=>
                            <Card className='prod-card'key={updateProdtwo._id}> 
                                    <Card.Body>
                                        <Card.Img className='prod-img' src={updateProdtwo.image} /> 
                                        {/* alt={product.title} */}
                                        <Card.Title className='title-text'>{updateProdtwo.title ? updateProdtwo.title.substring(0, 15) : 'enter product name'}</Card.Title>
                                        <Card.Text>  
                                            <h5 style={{color:'#0277BD'}}>{formatter.format(updateProdtwo.price*84)} <span>
                                            ({updateProdtwo.discount ? ` ${ updateProdtwo.discount }%` : 'discount Not Applicable'}) </span> </h5>
                                      </Card.Text>
                                      <Button className='add-to-btn-two' > Add to cart </Button>
                                    </Card.Body>
                                </Card>
                        
                    )
                    }
                   
                 </div>
          </div>       
         </Col>
       </Row>
    </div>
  )
}

export default Editpage