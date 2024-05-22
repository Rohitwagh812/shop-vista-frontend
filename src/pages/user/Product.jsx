import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Card} from 'react-bootstrap';
import axios from 'axios'
import '../../css/cilentside/prod.css'
// import products from "../../../prod.json"
// import api from '../../api'

import { useNavigate } from 'react-router-dom';


function Product({ cartItem , userData}) {

  const [prod , setProd] = useState([])
  const [prods , setProds] = useState([])
  const [lessThen , setLessThen] = useState()
  const [priceFilter, setPriceFilter] = useState('');
  const [priceFilters, setPriceFilters] = useState('');
  const [cartProduct , setCartProduct] = useState({})

  const navigate = useNavigate()
  // console.log(cartItem)

  useEffect(()=>{

    axios.get('https://shop-vista-backend.onrender.com/products')
      .then((response) => {
        // console.log(response.data);
        setProd(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


  }, [])  

  useEffect(()=>{
    handleclicktoallproduct()
  }, [])


  const handleclicktoallproduct = async () =>{
   await axios.get('https://shop-vista-backend.onrender.com/products')
    .then((response) => {
      // console.log(response.data);
      setProd(response.data)
    })
  }

  
  const handleClick = async (name) => {
    setPriceFilter("");
    setPriceFilters("");
     const Name = await name.toLocaleLowerCase()

    try {
      if (Name) {
          
          const response = await axios.get(`https://shop-vista-backend.onrender.com/products/${Name}`); // Log the entire response object
            console.log('Fetched products:', response.data);
            setProd(response.data.data)

      }
  } catch (error) {
      console.error('Error fetching products:', error);
  }
}
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

      const handlePriceFilterChange = (e) => {
        const newPriceFilter = e.currentTarget.value;
        setPriceFilter(parseFloat(newPriceFilter)); // Ensure priceFilter is stored as a number
    };

    useEffect(() => {
        if (!priceFilter) {
            setProds(prod);
        } else {
            // Otherwise, filter products based on the price filter
            const filteredProducts = prod.filter(product => {
                return parseFloat(product.price) * 83.87 < parseFloat(priceFilter);
            }); 
            setProds(filteredProducts);
            console.log(filteredProducts);
        }
    }, [priceFilter, prod]);
    
    const handlePriceFilterChanges = (e) => {
      const newPriceFilters = parseFloat(e.currentTarget.value);
      setPriceFilters(newPriceFilters);
  };
  
  useEffect(() => {
      if (!priceFilters && priceFilters !== 0) {
          setProds(prod);
      } else {
          const filteredProducts = prod.filter(product => parseFloat(product.price) * 83.87 > priceFilters); 
          setProds(filteredProducts);
          console.log(filteredProducts)
      }
  }, [priceFilters, prod]);
  
  
 
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue)
    let filtered = [...prod];
    switch (selectedValue) {
      case '1': // Price
          //   const Price = prod.filter(product => {
          //     return parseFloat(product.price) * 83.87 < 10000 ;
          // });
          // setProds(Price);
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
      case '2': // Discount
        //  const Price = prod.filter(product => {
        //     return parseFloat(product.discount) ;
        // });
        // setProds(Price);
        filtered = filtered.filter(product => parseFloat(product.discount) > 0);
          break;
      case '3': // A to Z
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
      case '4': // Z to A
          filtered = filtered.sort((a, b) => b.title.localeCompare(a.title))
          break;
      default:
          console.log('Invalid option');
          break;
  }
          setProds(filtered);

};

const [productIds, setProductIds] = useState([]);


const addProductToState = (product) => {
  // setProductIds(prevProductIds => [...prevProductIds, product]);

  // console.log('hello button click')

  // console.log(productIds?._id)

  const updatedCartItem = {  
            ...cartItem,
            userId: userData,
            productId: product._id,
            quantity: 1,
            price: product.price,
            image: product.image,
            title: product.title,
            category: product.category
          };

          setCartProduct(updatedCartItem)

};
useEffect(() => {
  const addToCart = async () => {
    try {
      const response = await axios.post('https://shop-vista-backend.onrender.com/product/cart', cartProduct);
      console.log('Cart item added:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  if (cartProduct.userId && cartProduct.productId && cartProduct.quantity && cartProduct.price) {
    addToCart(); 
  }
}, [ cartProduct ]);




// console.log(cartProduct)

  return (
    <div className="product-page"> 
       <Row>
           <Col className='prod-left-side' lg={1}>
                <div className="top-div">
                  <Button className='search-btn'> Search for items </Button>
                </div>
                <div className="center div">
                  <div className="input-div">
                    <div className="inputs">
                     <label> Price Less Than :   </label>
                     <input type="text" list='input' onChange={handlePriceFilterChange}/>
                    </div>
                    <div className="inputs">
                      <label> Price {/*Greater */} More Than : </label> 
                     <input list='input' type="text" onChange={handlePriceFilterChanges}/>
                    </div>
                  </div>
                  <div className="sort-by">
                    <div className="text">
                      <h5>Sort By :</h5>
                    </div>
                    <div className="form-div">
                    <Form.Select onChange={handleSelectChange}>
                        <option>Select Item</option>
                        <option value="1">Price</option>
                        <option value="2">Discount</option>
                        <option value="3">A to Z</option>
                        <option value="4">Z to A</option>
                    </Form.Select>
                    </div>
                  </div>
                  <div className="category">
                    <h5>Category : </h5>
                    <div className="categorys">
                      <Button className="categoryButton mensClothing" onClick={() => handleClick("Men's Clothing")}>
                        Men's Clothing
                      </Button>
                      <Button className="categoryButton jewelry" onClick={() => handleClick("Jewelery")}>
                        Jewelery
                      </Button>
                      <Button className="categoryButton electronics" onClick={() => handleClick('Electronics')}>
                        Electronics
                      </Button>
                      <Button className="categoryButton womensClothing" onClick={() => handleClick("Women's Clothing")}>
                        Women's Clothing
                      </Button>
                      <Button className="categoryButton clothe" onClick={() => handleClick('Clothe')}>
                        Clothe
                      </Button>
                      <Button className="categoryButton shoes" onClick={() => handleClick('Shoes')}>
                        Shoes
                      </Button>
                      <Button className="categoryButton allProducts" onClick={() => handleclicktoallproduct()}>
                         Get All Products
                      </Button>
                      <datalist id="input" style={{backgroundColor:"#fff"}}>
                        <option value="900"></option>
                        <option value="1000"></option>
                        <option value="1500"></option>
                        <option value="2000"></option>
                        <option value="2500"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className="bottom-div">
                  <Button onClick={()=> navigate("/cart")}> Go To Cart </Button>
                </div>
           </Col>
           <Col className='prod-right-side' lg={9}>
            <div className="text-div">
              <h4>
                SELECT A PRODUCT AND ADD TO CART
              </h4>
              
            <h6>Total Product : <span> { prods.length } </span></h6>
            </div>
            <div className="product-data">
              <div className="all-product"> 
              { prods.length === 0 ? (
                    <div>No products available</div>
                ) : (
                prods.map((product)=>{
                  return(
                    <Card className='single-product' key={product._id}>
                      <Card.Body>
                      <Card.Img className='imaga-tag' src={product.image} alt={product.title}/>
                      <Card.Title className='title-text'>{product.title.length > 21 ? product.title.substring(0, 21) + '...' : product.title} </Card.Title>
                      <Card.Text>  
                        <h5 style={{color:'#0277BD'}}>{formatter.format(product.price * 84)} <span>
                          ({product.discount ? ` ${product.discount}` : 'discount Not Applicable'}) </span> </h5>
                      </Card.Text>
                      <Button className='add-to-btn' onClick={() => addProductToState(product)}> Add to cart </Button>
                      {/* <Button
                          className='add-to-btn'
                          style={{ marginTop: 10 }}
                          onClick={() => {
                            if (product._id in cartItem) {
                              const currentItem = cartItem[product.id];
                              handleAddToCart({
                                [product.id]: {
                                  user_id:userData,
                                  id:product._id,
                                  image:product.image,
                                  title: product.title,
                                  price: product.price,
                                  category:product.category,
                                  quantity: currentItem.quantity + 1
                                }
                              });
                            } else {
                              handleAddToCart({
                                [product.id]: { 
                                  user_id:userData,
                                  id:product._id,
                                  image:product.image,
                                  title: product.title,
                                  category:product.category,
                                  price: product.price,
                                  quantity: 1
                                }
                              });
                            }
                          }}
                        >
                          Add To Cart
                        </Button> */}

                      </Card.Body>
                    </Card>
                  )
                  } )
                    )
               }
              </div> 
            </div>
           </Col>
       {/* </Container> */}
        </Row>
    </div>
  )
}

export default Product