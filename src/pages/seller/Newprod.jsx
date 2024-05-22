import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import '../../css/sellerside/newprod.css'
import axios from 'axios';




function Newprod() {


    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [price , setPrice] = useState('');
    const [discount , setDiscount] = useState('');
    const [category , setCategory] = useState('');
    const [imguri , setImguri] = useState('');
    const [mainpage , setmainpage] = useState([])
    const [updateProdtwo , setUpdateProdtwo] = useState([])

    
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      });
 

      const total = {
        title, 
        description, 
        price, 
        discount, 
        category, 
        image: imguri 
      }
    
      
      const handleAddToProduct = () =>{

        axios.post('https://shop-vista-backend.onrender.com/product/newprod' , total).then((res)=>{
          
         console.log(res.data.data)
         setmainpage(res.data.data._id)
           
        })
        setTitle('')
        setCategory('')
        setDescription('')
        setDiscount('')
        setImguri('')
        setPrice('')
         alert('Product Created Successfully')
      }

      useEffect(()=>{
        axios.get(`https://shop-vista-backend.onrender.com/products/all/${mainpage}`).then(res=>{
          console.log(res.data.data)
          setUpdateProdtwo(res.data.data)
        })
  },[])



  return (
    <div className="newprod-page">
        <Row>
            <Col lg={6}>
                <div className="left-div">
                    <div className="inputs">
                        <input type="text" placeholder='product title' value={title} onChange={(e)=> setTitle(e.currentTarget.value)} />

                        <textarea placeholder='product Description' value={description} onChange={(e)=> setDescription(e.currentTarget.value)} ></textarea>

                            <div className="joint-input">
                                <input type="text" placeholder='product price' value={price} onChange={(e)=> setPrice(e.currentTarget.value)} />

                                <input type="text" placeholder='product discount' value={discount} onChange={(e)=> setDiscount(e.currentTarget.value)} />
                            </div>

                        <input type="text" placeholder='product category' value={category} onChange={(e)=> setCategory(e.currentTarget.value)} />

                        <input type="text" placeholder='product image uri' value={imguri} onChange={(e)=> setImguri(e.currentTarget.value)}/>
                    </div>
                    <div className="btn-add-prod">
                        <Button className='btn-prod' onClick={handleAddToProduct}> Add Product </Button>
                </div>
                </div>
            </Col>
            <Col lg={6}>
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
                    title.length === 0  || imguri.length === 0 || price.length === 0 || description.length === 0 || discount.length === 0  ? (
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
                    ) }
                   
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

export default Newprod