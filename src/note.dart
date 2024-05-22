mongodb+srv://rohitwagh0801:<password>@cluster0.whprgnv.mongodb.net/

MqkedfzVzN5e9ZJ2




                 { prod.map((product)=>{
                    return(
                      <Card className='single-product' key={product.id}>
                        <Card.Body>
                        <Card.Img className='imaga-tag' src={product.image} alt={product.title}/>
                        <Card.Title className='title-text'> {product.title} </Card.Title>
                        <Card.Text>  
                          <h5 style={{color:'#0277BD'}}>{formatter.format(product.price * 84)}</h5>
                        </Card.Text>
                        <Button className='add-to-btn'> Add to cart </Button>
                        </Card.Body>
                      </Card>
                    )
                  })
