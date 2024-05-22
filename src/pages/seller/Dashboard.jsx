import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { CChart } from '@coreui/react-chartjs'
import '../../css/sellerside/dash.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() { 

  const [ products , setProducts ] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{

    axios.get('https://shop-vista-backend.onrender.com/products')
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


  }, [])  

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });


  const handleNewprodpage = () =>{
     navigate('/newprod')
  }

  const handledeletebtn = async (id) => {
    try {
        console.log(`Deleting product with ID: ${id}`);
        const res = await axios.delete(`https://shop-vista-backend.onrender.com/product/products/${id}`);
        console.log('Delete response:', res); 
        alert('Product Deleted Successfully')
    } catch (error) {
        console.error('Error deleting the product:', error.response ? error.response.data : error.message); 
    }
};


  return (
    <div className='dash-page'>
      <Row>
        <Col lg={4}>
             <div className="chart-js">
              <div className="top-sell">
                <h4 className='seles-text'>SALES PERFORMANCE</h4>
              </div>
             <CChart className='main-chart' 
                  type="bar"
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'Products sell',
                        backgroundColor: 'green',
                        data: [80, 72, 62, 79, 70, 80, 79, 80, 70],
                      },{
                        label: 'Products Returns',
                        backgroundColor: '#000',
                        color:'yellow',
                        data: [10, 20, 32, 19, 10, 50, 29, 40],
                      },{
                        label: 'Order Cencels ',
                        backgroundColor: 'red',
                        color:'red',
                        data: [20, 30, 12, 39, 40, 40, 39, 80, 60],
                      },
                    ],
                  }}
                  labels="months"
                  options={{
                    plugins: {
                      legend: {
                        label:  {
                          color: 'green',
                        }
                      }
                    }
                  }}
                />
                <div className="total">
                    <h4> Total Products = <span className='span'>{products.length}</span></h4>
                </div>
             </div>
             
        </Col>
          <Col>
            <div className="title-btn-div">
              <h3> YOUR PRODUCTS </h3>
              <Button className='add-new-btn' onClick={handleNewprodpage}>
                 Add New Product
              </Button>
            </div>
            <div className="right-div-main">
            { products.length === 0 ? (
                    <div>No products available</div>
                ) : (
                products.map((product)=>{
                  return(
                    <Card className='single-product' key={product._id}>
                      <Card.Body>
                      <Card.Img className='imaga-tag' src={product.image} alt={product.title}/>
                      <Card.Title className='title-text'>{product.title.length > 21 ? product.title.substring(0, 21) + '...' : product.title} </Card.Title>
                      <Card.Text>  
                        <h5 style={{color:'#0277BD'}}>{formatter.format(product.price * 84)} <span>
                          ({product.discount ? ` ${product.discount}` : 'no discount'}) </span> </h5>
                      </Card.Text>
                      <div className="buttons-div">
                        <Button className='edit-btn' onClick={()=> navigate('/editprod' ,{ state: {id:product._id} }) }> Edit </Button>
                        <Button className='delete-btn' onClick={()=>handledeletebtn(product._id)}> Delete </Button> 
                      </div>
                      </Card.Body>
                    </Card>
                  )
                  } )
                    )
               }
            </div>
          </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
