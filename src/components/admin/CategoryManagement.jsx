import axios from 'axios'
import { myContext } from '../context/Context'
import { useContext, useEffect, useState } from 'react'
import '../admin/Product.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { backendUrl } from '../../utils/utils';

export default function CategoryManagement() {

    const { newCategory, setNewCategory, categoryName, setCategoryName, categoryImage, setCategoryImage,
         newTrendsCategory,setNewTrendsCategory,catTrendName,setCatTrendName,catTrendImage,setCatTrendImage } = useContext(myContext)
    const [editId, setEditId] = useState(null)
    useEffect(() => {
        fetchProducts()
    }, []);
    useEffect(()=>{
        fetchTrendsCat()
    },[])

    const fetchProducts = async () => {
        const response = await axios.get(`${backendUrl}/category/Category`)
        setNewCategory(response.data)
    }
    

    const addProd = async () => {
        try {
            await axios.post(`${backendUrl}/category/Category`, { categoryName: categoryName, categoryImage: categoryImage })
            fetchProducts()
            setCategoryImage('')
            setCategoryName('')
        }
        catch (error) {
            console.log(error)
        }
    }

    

    const confirmDelete = async (id, deleteProd) => {
        if (window.confirm(`Are you want to delete this product, "${deleteProd}}"?`)) {
            deleteCat(id);
        }
    }
    const deleteCat = async (id) => {
        try {
            await axios.delete(`${backendUrl}/category/Category/${id}`)
            fetchProducts()
        }
        catch (error) {
            console.log(error)
        }
    }

    const editCat = async (cat) => {
        setEditId(cat._id)
        setCategoryName(cat.categoryName)
        setCategoryImage(cat.categoryImage)
    }

    const cancelCat = async () =>{
        setEditId(null)
        setCategoryName('')
        setCategoryImage('')
    }


    const updateCat = async (id) =>{
        try{
            await axios.put(`${backendUrl}/category/Category/${id}`,{ categoryName: categoryName, categoryImage: categoryImage})
            fetchProducts()
            cancelCat()
        }
        catch (error) {
            console.log(error)
        }
    }

    // TRENDS CATEGORY
    const fetchTrendsCat = async () => {
        const response = await axios.get("${backendUrl}/trends/Trends")
        setNewTrendsCategory(response.data)
    }
    console.log(newTrendsCategory)

    const addProdCat = async () => {
        try {
            await axios.post("${backendUrl}/trends/Trends", { catTrendName : catTrendName, catTrendImage : catTrendImage })
            fetchProducts()
            setCatTrendName('')
            setCatTrendImage('')
        }
        catch (error) {
            console.log(error)
        }
    }

    const editCatTrend = async (catT) => {
        setEditId(catT._id)
        setCatTrendName(catT.catTrendName)
        setCatTrendImage(catT.catTrendImage)
    }

    const confirmDeleteTrend = async (id, deleteTrend) => {
        if (window.confirm(`Are you want to delete this product, "${deleteTrend}}"?`)) {
            deleteCatTrend(id);
        }
    }
    const deleteCatTrend = async (id) => {
        try {
            await axios.delete(`${backendUrl}/trends/Trends/${id}`)
            fetchTrendsCat()
        }
        catch (error) {
            console.log(error)
        }
    }
    const cancelCatTrend = async () =>{
        setEditId(null)
        setCatTrendName('')
        setCatTrendImage('')
    }

    const updateCatTrend = async (id) =>{
        try{
            await axios.put(`${backendUrl}/trends/Trends/${id}`,{ catTrendName:catTrendName, catTrendImage:catTrendImage})
            fetchTrendsCat()
            cancelCatTrend()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="mainP1">

            <div className="addProducts1p">
                <div><h2 style={{ color: 'white', marginTop: '20px' }}><u>Add Category</u></h2></div><br />
                <div tyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <div><input className='inpStyle' type="text" placeholder='Enter Anime Category name...' onChange={(a) => setCategoryName(a.target.value)} /></div>
                    <div><input className='inpStyle' type="text" placeholder='Enter Anime Category Image...' onChange={(b) => setCategoryImage(b.target.value)} /></div>
                </div><br />
                <div><Button variant="outline-danger" style={{ width: '200px', borderRadius: '5px' }} onClick={addProd}>Add Anime Category</Button></div>
            </div>

            <hr style={{ color: 'white' }} />

            <div className="displayProducts">
                <div><h2 style={{ color: 'white' }}><u>Category By Anime</u></h2></div>
                <div><h4 style={{ color: 'white' }}>Number of category : {newCategory.length}</h4></div>

                <div className='dispProd' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    {
                        newCategory.map((cat) =>
                            <div key={newCategory._id}>
                                {
                                    cat._id === editId ? (
                                        <div>
                                            <div><input className='inpStyle' value={categoryName} type="text" placeholder='Enter New Category name...' onChange={(a) => setCategoryName(a.target.value)} /></div>
                                            <div><input className='inpStyle' value={categoryImage} type="text" placeholder='Enter New Category Image...' onChange={(b) => setCategoryImage(b.target.value)} /></div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10px' }}>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={()=>updateCat(cat._id)} >Update</Button>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={cancelCat}>cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Card style={{ width: '18rem', margin: '20px' }}>
                                            <Card.Img variant="top" src={cat.categoryImage} style={{ height: '300px', width: '100%' }} />
                                            <Card.Body>
                                                <Card.Title>Category Name : <br />{cat.categoryName}</Card.Title>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <Button variant="primary" style={{ width: '100px' }} onClick={()=>editCat(cat)}>EDIT</Button>
                                                    <Button style={{ width: '100px' }} variant="primary" onClick={() => confirmDelete(cat._id, cat.name)}>DELETE</Button>
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

            <hr style={{ color: 'white' }} />

            <div className="addProducts1p">
                <div><h2 style={{ color: 'white', marginTop: '20px' }}><u>Add Trends Category</u></h2></div><br />
                <div tyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <div><input className='inpStyle' value={catTrendName} type="text" placeholder='Enter Trend Category name...' onChange={(a) => setCatTrendName(a.target.value)} /></div>
                    <div><input className='inpStyle' value={catTrendImage} type="text" placeholder='Enter Trend Category Image...' onChange={(b) => setCatTrendImage(b.target.value)} /></div>
                </div><br />
                <div><Button variant="outline-danger" style={{ width: '200px', borderRadius: '5px' }} onClick={addProdCat}>Add Trends Category</Button></div>
            </div>


<div className="displayProducts">
    <div><h2 style={{ color: 'white' }}><u>Category By Trends</u></h2></div>
    <div><h4 style={{ color: 'white' }}>Number of category : {newTrendsCategory.length}</h4></div>

    <div className='dispProd' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {
            newTrendsCategory.map((catT) =>
                <div key={newTrendsCategory._id}>
                    {
                        catT._id === editId ? (
                            <div>
                                <div><input className='inpStyle' type="text" value={catTrendName} placeholder='Enter New Category name...' onChange={(a) => setCatTrendName(a.target.value)} /></div>
                                <div><input className='inpStyle' value={catTrendImage} type="text" placeholder='Enter New Category Image...' onChange={(b) => setCatTrendImage(b.target.value)} /></div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10px' }}>
                                    <Button variant="primary" style={{ width: '100px' }} onClick={()=>updateCatTrend(catT._id)} >Update</Button>
                                    <Button variant="primary" style={{ width: '100px' }} onClick={cancelCatTrend}>cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <Card style={{ width: '18rem', margin: '20px' }}>
                                <Card.Img variant="top" src={catT.catTrendImage} style={{ height: '300px', width: '100%' }} />
                                <Card.Body>
                                    <Card.Title>Category Name : <br />{catT.catTrendName}</Card.Title>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Button variant="primary" style={{ width: '100px' }} onClick={()=>editCatTrend(catT)}>EDIT</Button>
                                        <Button style={{ width: '100px' }} variant="primary" onClick={() => confirmDeleteTrend(catT._id, catT.name)}>DELETE</Button>
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