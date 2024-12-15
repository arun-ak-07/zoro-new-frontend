import React, { useContext, useEffect, useState } from 'react';
import "../home/home.css";
import AutoSlideCarousel from './AutoSlideCarousal';
import Card from 'react-bootstrap/Card';
import { myContext } from '../context/Context';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import tokyo from '../home/tokyo.png'
import oversize from '../home/oversize.png'
import { backendUrl } from '../../utils/utils';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    const { newCategory, setNewCategory,products,searchItem } = useContext(myContext)
    const [trends, setTrends] = useState([])

    const nav = useNavigate()
    const images = [
        tokyo,
        'https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_31.jpg?v=1696066216',
        oversize
    ];
console.log("search",searchItem)
    useEffect(() => {
        fetchCat()
    }, []);

    const fetchCat = async () => {
        const response = await axios.get(`${backendUrl}/category/Category`)
        setNewCategory(response.data)
    }
    useEffect(() => {
        fetchTrends()
    }, []);

    const fetchTrends = async () => {
        const response = await axios.get(`${backendUrl}/trends/Trends`)
        setTrends(response.data)
    }

    const anime=[...new Set(products.map(data=>data.anime))]

   
    const shopByProducts = [...new Set(products.map(data=>data.category))]
    console.log(", category" ,shopByProducts)

    function handleSelect(e){
        const query=e.target.value
        const query1=query.split(" ").join("_")
        nav(`/Products/${query1}`)
    }
     
    console.log(newCategory)
    console.log("Trends", trends)
    console.log(products,anime)

    const categoryAnime = [...new Set(newCategory.map(data=>data.categoryName))]
    console.log("first ANime",categoryAnime)

    const handleAnime = async (cat) => {
        // alert(cat)
        const query = cat
        const query1=query.split(" ").join("_")
        nav(`/Products/${query1}`)
        alert(query1)
        // nav(`/Products/${cat}`) 
    
    }
    const category=[...new Set(products.map(data=>data.category))]

    const clicks = async (cats) => {
        if(cats.categoryName === "soldier collection"){
            nav('/NewLaunch')
        }
        else {
            nav(`/Products/${cats.categoryName.split(" ").join("_")}`)
        }
        
        // alert(cats.categoryName)
    }
    return (
        <div className="main1">

            <div className="header1">

            <Header/>
                
            </div>

            <div className="center1">

                <div className="centerSlide1">
                    <AutoSlideCarousel  interval={3000} images={images} />
                </div>

                <div className="newlyLaunched">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">Newly Launched</h3></div>
                    <div ><p className='newlyLaunchedP'>Each launch comes with a special price</p></div>
                    <div style={{ paddingTop: '30px' }}>
                        <ImageSlider />
                    </div>

                </div>

                <div className="demands" style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h4 style={{ fontWeight: 'bold' }}>MOST IN DEMAND</h4></div>
                    <div className="demandImages" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                        <div><Link to={(`/ProductsDisplay/${category[2]}`)}><img alt='' src='https://www.fansarmy.in/cdn/shop/files/3_c5b347eb-ddba-40ea-b817-92c9f4443887_300x.jpg?v=1686031534'></img></Link></div>
                        <div><Link to={(`/ProductsDisplay/${category[6]}`)}><img alt='' src="https://www.fansarmy.in/cdn/shop/files/4_f64e3e32-64c7-4ea2-a417-478e5ee3a018_300x.jpg?v=1686031535" /></Link></div>
                        <div><Link to={(`/ProductsDisplay/${category[3]}`)}><img alt='' src="https://www.fansarmy.in/cdn/shop/files/5_77e1f048-18f3-4564-a0fe-ddbbe0ca3675_300x.jpg?v=1686031535" /></Link></div>
                        {/* <div><Link><img alt='' src="https://www.fansarmy.in/cdn/shop/files/2_9df253b8-7712-46cf-887b-d8b5b9d4df0c_300x.jpg?v=1686031535" /></Link></div> */}
                    </div>
                </div>

                <div className="tshirtTrends">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">T-Shirts In Trends</h3></div>

                    <div className='catDisp'>
                        {
                            trends.map((trend) =>
                                <div><Link to={(`/ProductsDisplay/${trend.catTrendName}`)}>
                                    <Card style={{ width: '18rem', margin: '30px' }}>
                                        <Card.Img variant="top" src={trend.catTrendImage} />
                                    </Card></Link>
                                </div>
                            )
                        }
                    </div>

                </div>

                <div className="shopByAnime1">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">Shop By Anime</h3></div>
                    <div><p>Checkout The Products By Anime Collection</p></div>



                    <div className='catDisp'>
                        {
                            newCategory.map((category) =>
                                <div>
                                    
                                    <Card  onClick={()=>clicks(category)}  style={{ width: '18rem', margin: '30px',cursor:'pointer' }}>
                                        <Card.Img variant="top" src={category.categoryImage} />
                                    </Card>
                                    
                                </div>
                            )
                        }
                    </div>

                </div>
                
            </div>



            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                <h2 class="jdgm-carousel-title" className='review'>Review From Our Otaku's</h2>
            </div> */}
            <hr />
            
            <div className="footer1" style={{paddingTop:'100px'}}>

                <Footer/>
        
            </div>
            
        </div>
    );
};

export default Home;
