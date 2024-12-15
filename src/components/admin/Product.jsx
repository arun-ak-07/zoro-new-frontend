import axios from 'axios'
import { myContext } from '../context/Context'
import { useContext, useEffect, useState } from 'react'
import '../admin/Product.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { backendUrl } from '../../utils/utils';
import toast from 'react-hot-toast';


const Product = () => {
    // const [modalShow, setModalShow] = React.useState(false);
    const { products, setProducts, name, setName, price, setPrice, image, setImage, category, setCategory,
         description, setDescription, anime, setAnime,qty,setQty,size,setSize,stock,setStock,
         productType,setProductType } = useContext(myContext)
    const [editId, setEditId] = useState(null)
    const [stockS, setStockS] = useState('');
const [stockM, setStockM] = useState('');
const [stockX,setStockX] = useState('')
const [stockXL,setStockXL] = useState('')
const [stockXXL,setStockXXL] = useState('')
const [addProdo,setAddProdo] = useState(false)
const [que,setQue] = useState('')
    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(`${backendUrl}/Product/products`)
        setProducts(response.data)
    }
    // Update stock state on input change
const handleStockSChange = (event) => {
    setStockS(event.target.value);
};
const handleStockMChange = (event) => {
    setStockM(event.target.value);
};
const handleStockXChange = (event) => {
    setStockX(event.target.value);
};
const handleStockXLChange = (event) => {
    setStockXL(event.target.value);
};
const handleStockXXLChange = (event) => {
    setStockXXL(event.target.value);
};
    const addProd = async () => {
        try {
            const stockS = parseInt(document.getElementById('stockS').value);
        const stockM = parseInt(document.getElementById('stockM').value);
        const stockX = parseInt(document.getElementById('stockX').value);
        const stockXL = parseInt(document.getElementById('stockXL').value);
        const stockXXL = parseInt(document.getElementById('stockXXL').value);

        // Check if any of the stock values are invalid or missing
        if (isNaN(stockS) || isNaN(stockM) || isNaN(stockX) || isNaN(stockXL) || isNaN(stockXXL)) {
            toast.error('Please enter valid numbers for all stock sizes.');
            return; // Exit the function if validation fails
        }
        // Check if product name already exists
        if (products.some(product => product.name === name)) {
            toast.error('Product name already exists. Please choose a different name.');
            return;
        }

        // Check if product image URL already exists
        if (products.some(product => product.image === image)) {
            toast.error('Product image URL already exists. Please use a different image URL.');
            return;
        }
            await axios.post(`${backendUrl}/Product/products`, { name: name, price: price, image: image, category: category, description: description, anime: anime, qty: qty,size:size,
            stock: {
                S: stockS,
                M: stockM,
                X: stockX,
                XL: stockXL,
                XXL: stockXXL,
            }
        })
            fetchProducts()
            toast.success("Product successfully added!!")
            // setName('')
            // setPrice('')
            // setImage('')
            // setCategory('')
            // setDescription('')
            // setAnime('')
            // setQty('')
            // setSize('')
            cancelProd()
        }
        catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = async (id, deleteProd) => {
        if (window.confirm(`Are you want to delete this product, "${deleteProd}}"?`)) {
            deleteProducts(id);
        }
    }

    const deleteProducts = async (id) => {
        try {
            await axios.delete(`${backendUrl}/Product/products/${id}`)
            fetchProducts()
        }
        catch (error) {
            console.log(error)
        }
    }

    const editProduct = async (Product) => {
        setEditId(Product._id)
        setName(Product.name)
        setPrice(Product.price)
        setImage(Product.image)
        setCategory(Product.category)
        setDescription(Product.description)
        setAnime(Product.anime)
        setQty(Product.qty)
        setSize(Product.size)
        setStockS(Product.stock.S)
        setStockM(Product.stock.M)
        setStockX(Product.stock.X)
        setStockXL(Product.stock.XL)
        setStockXXL(Product.stock.XXL)
    }

    const updateProduct = async (Product) => {
        try {
    
            // Make Axios PUT request to update the product
            await axios.put(`${backendUrl}/Product/products/${Product._id}`, {
                name: name,
                price: price,
                image: image,
                category: category,
                description: description,
                anime: anime,
                qty: qty,
                size: size,
                stock: {
                    S: stockS,
                    M: stockM,
                    X: stockX,
                    XL: stockXL,
                    XXL: stockXXL
                }
            });
            toast.success('Product successfully updated')
            fetchProducts()
            cancelProd()
        }
        catch (error) {
            console.log(error)
        }
    }

    const cancelProd = async () => {
        try{
            setEditId(null)
        setName('')
        setPrice('')
        setImage('')
        setCategory('')
        setDescription('')
        setAnime('')
        setQty('')
        setSize('')
        document.getElementById('stockS').value = '';
        document.getElementById('stockM').value = '';
        document.getElementById('stockX').value = '';
        document.getElementById('stockXL').value = '';
        document.getElementById('stockXXL').value = '';
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleSearchInputChange(e) {
        const query = e.target.value
        setQue(e.target.value)
        const filteredResults = products.filter((user) => {
          const { name, price, category, anime } = user
          return (
            name.toLowerCase().includes(query.toLowerCase()) ||
            price.toString().includes(query) ||
            category.toLowerCase().includes(query.toLowerCase()) ||
            anime.toLowerCase().includes(query.toLowerCase())
          )
        })
        setProducts(filteredResults)
    
      }


      function clearfill () {
        setQue('')
        setProducts(products)
        fetchProducts()
      }

    return (

        <div className="mainP1">



            <div className="addProducts1p">
                <div><Link onClick={()=>setAddProdo(true)}><h2 style={{ color: 'white', marginTop: '20px' }}><u>ADD PRODUCTS</u></h2></Link></div><br />
                {addProdo === true &&
                    <>
                <div className='productSelection' style={{color:'white',textAlignLast:'center'}}>
                    <h3>SELECT PRODUCT TYPE</h3>
                <select value={productType} onChange={(e)=>setProductType(e.target.value)}
                style={{width:'400px',height:'40px',fontSize:'18px',borderRadius:'5px',color:'white',background:'red',textAlign:'center',fontWeight:'bold'}}>
                    <option>SELECT PRODUCT TYPE</option>
                    <option value="t-shirt">T-SHIRTS</option>
                    <option value="shoes">SHOES</option>
                    <option value="caps">CAPS</option>
                    <option value="keychains">KEYCHAINS</option>
                </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <div><input className='inpStyle' value={name} type="text" placeholder='Enter product name...' onChange={(a) => setName(a.target.value)} /></div>
                    <div><input className='inpStyle' value={price} type="text" placeholder='Enter product price...' onChange={(b) => setPrice(b.target.value)} /></div>
                    <div><input className='inpStyle' value={image} type="text" placeholder='Enter product image...' onChange={(c) => setImage(c.target.value)} /></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    {/* <div><input className='inpStyle' value={category} type="text" placeholder='Enter product category...' onChange={(d) => setCategory(d.target.value)} /></div> */}

                    <div>
                    <select style={{fontSize:'18px',color:'gray',textAlign:'left'}} className='inpStyle' value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option style={{textAlign:'center'}}>select product category</option>
                        <option value="oversize" style={{textAlign:'center'}}>oversize</option>
                        <option value="sweatshirt" style={{textAlign:'center'}}>sweatshirt</option>
                        <option value="t-shirt" style={{textAlign:'center'}}>t-shirt</option>
                        <option value="combo" style={{textAlign:'center'}}>combo</option>
                        <option value="AOP" style={{textAlign:'center'}}>AOP</option>
                        <option value="jacket" style={{textAlign:'center'}}>jacket</option>
                        <option value="hoodies" style={{textAlign:'center'}}>hoodies</option>
                        <option value="tanktop" style={{textAlign:'center'}}>tanktop</option>
                        <option value="solids" style={{textAlign:'center'}}>solids</option>
                        <option value="plain-shirt" style={{textAlign:'center'}}>plain-shirt</option>

                    </select>
                </div>

                    <div><input className='inpStyle' value={description} type="text" placeholder='Enter product description...' onChange={(e) => setDescription(e.target.value)} /></div>
                    {/* <div><input className='inpStyle' value={anime} type="text" placeholder='Enter anime name...' onChange={(f) => setAnime(f.target.value)} /></div> */}

                    <div>
                    <select style={{fontSize:'18px',color:'gray',textAlign:'left'}} className='inpStyle' value={anime} onChange={(f)=>setAnime(f.target.value)}>
                        <option style={{textAlign:'center'}}>select anime category</option>
                        <option value="Naruto" style={{textAlign:'center'}}>Naruto</option>
                        <option value="demon slayer" style={{textAlign:'center'}}>demon slayer</option>
                        <option value="jujustu kaisen" style={{textAlign:'center'}}>jujustu kaisen</option>
                        <option value="one piece" style={{textAlign:'center'}}>one piece</option>
                        <option value="tokyo revengers" style={{textAlign:'center'}}>tokyo revengers</option>
                        <option value="dragon ball" style={{textAlign:'center'}}>dragon ball</option>
                        <option value="attack on titan" style={{textAlign:'center'}}>attack on titan</option>
                        {/* <option value="tanktop" style={{textAlign:'center'}}>tanktop</option> */}
                    </select>
                </div>

                    <div><input className='inpStyle' value={qty} type="text" placeholder='Enter product qty...' onChange={(g) => setQty(g.target.value)} /></div>
                    <div><input className='inpStyle' value={size} type="text" placeholder='Enter product size...' onChange={(h) => setSize(h.target.value)} /></div>
                </div><br />
                <div>
                {/* <input className='inpStyle' value={stock} type="text" placeholder='Enter product stock...' onChange={(i) => setStock(i.target.value)} /> */}
                <div>
                <label style={{color:'white'}}>Enter Stock For Sizes : </label>
                <input id="stockS" className='inpStyle1' type="number" placeholder='size S' />
                    <input id="stockM" className='inpStyle1' type="number" placeholder='size M' />
                    <input id="stockX" className='inpStyle1' type="number" placeholder='size X' />
                    <input id="stockXL" className='inpStyle1' type="number" placeholder='size XL' />
                    <input id="stockXXL" className='inpStyle1' type="number" placeholder='size XXL' />
                </div>
                </div>


                
                <div><Button variant="outline-danger" style={{ width: '200px', borderRadius: '5px' }} onClick={addProd} >Add Products</Button>
                <button style={{color:'white',backgroundColor:'#003366',border:'none'}} onClick={()=>setAddProdo(false)}>close</button>
                    {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Products
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)} */}

                </div>
                </>}
            </div>

            <hr style={{ color: 'white', marginTop: '30px' }} />

            <div className="displayProducts">
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    {/* <input type="text" onClick={handleSearchInputChange} style={{width:'300px',height:'40px',borderRadius:'5px',border:'none'}} /> */}
                    <Form className="d-flex">
                <Form.Control type="search" value={que} onChange={handleSearchInputChange} placeholder="Search" className="me-2" style={{ width: 400, marginLeft: 80 }} aria-label="Search" />
              </Form>
              <button onClick={clearfill} style={{color:'white',backgroundColor:'#003366',border:'none'}}>clear fliter</button>
                    <h2 style={{ color: 'white' }}><u>Show Products</u></h2></div>
                <div><h4 style={{ color: 'white' }}>Number of Products : {products.length}</h4></div>
                <div className='dispProd' >

                    {
                        products.map((Products) =>
                            <div key={Products._id} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                {
                                    Products._id === editId ? (
                                        <div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product name...' value={name} onChange={(a) => setName(a.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product price...' value={price} onChange={(b) => setPrice(b.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product image...' value={image} onChange={(c) => setImage(c.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product category...' value={category} onChange={(d) => setCategory(d.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product description...' value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit anime name...' value={anime} onChange={(f) => setAnime(f.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit qty...' value={qty} onChange={(g) => setQty(g.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit anime size...' value={size} onChange={(h) => setSize(h.target.value)} /></div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly',marginTop:'10px' }}>
                                            <input
    className='inpStyle1'
    type="number"
    placeholder='size S'
    value={stockS}
    onChange={handleStockSChange}
/>
<input
    className='inpStyle1'
    type="number"
    placeholder='size M'
    value={stockM}
    onChange={handleStockMChange}
/>
<input
    className='inpStyle1'
    type="number"
    placeholder='size X'
    value={stockX}
    onChange={handleStockXChange}
/>
<input
    className='inpStyle1'
    type="number"
    placeholder='size XL'
    value={stockXL}
    onChange={handleStockXLChange}
/>
<input
    className='inpStyle1'
    type="number"
    placeholder='size XXL'
    value={stockXXL}
    onChange={handleStockXXLChange}
/>

                </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10px' }}>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={() => updateProduct(Products)}>Update</Button>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={cancelProd}>cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Card style={{ width: '18rem', margin: '20px' }}>
                                            <Card.Img variant="top" style={{ height: '280px', width: '100%' }} src={Products.image} />
                                            <Card.Body>
                                                <Card.Title>Name : {Products.name}</Card.Title>
                                                <Card.Text>Price : {Products.price}₹</Card.Text>
                                                <Card.Text>Category : {Products.category}</Card.Text>
                                                <Card.Text>qty : {Products.qty}</Card.Text>
                                                <Card.Text>size : {Products.size}</Card.Text>
                                                <Card.Text>anime : {Products.anime}</Card.Text>
                                                <Card.Text style={{ textAlign: "justify" }}>Description : {Products.description}</Card.Text>
                                                <Card.Text>Stocks</Card.Text>
                                                {Products.stock.S<=1 ? 
                                                <Card.Text style={{color:'red'}}>Size S : Stock is less!!</Card.Text> :  <Card.Text>Size S : {Products.stock.S}</Card.Text>
                                            }
                                            {Products.stock.M<=1 ? 
                                                <Card.Text style={{color:'red'}}>Size M : Stock is less!!</Card.Text> :  <Card.Text>Size M : {Products.stock.M}</Card.Text>
                                            }
                                            {Products.stock.X<=1 ? 
                                                <Card.Text style={{color:'red'}}>Size X : Stock is less!!</Card.Text> :  <Card.Text>Size X : {Products.stock.X}</Card.Text>
                                            }
                                            {Products.stock.XL<=1 ? 
                                                <Card.Text style={{color:'red'}}>Size XL : Stock is less!!</Card.Text> :  <Card.Text>Size XL : {Products.stock.XL}</Card.Text>
                                            }
                                            {Products.stock.XXL<=1 ? 
                                                <Card.Text style={{color:'red'}}>Size XXL : Stock is less!!</Card.Text> :  <Card.Text>Size XXL : {Products.stock.XXL}</Card.Text>
                                            }
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <Button variant="primary" style={{ width: '100px' }} onClick={() => editProduct(Products)}>EDIT</Button>
                                                    <Button style={{ width: '100px' }} variant="primary" onClick={() => confirmDelete(Products._id, Products.name)}>DELETE</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                }

                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}
export default Product


