import React, { useContext, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import "../home/home.css"
import TwoHeadingsSlide from './TwoHeadingsSlide';
import { myContext } from '../context/Context';
import axios from 'axios';
import PopOverSearchButton from './PopoverSearchButton';
import { CiHeart } from 'react-icons/ci';
import { backendUrl } from '../../utils/utils';

const MyNavbar = () => {
    const { newCategory, setNewCategory } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)

    

    useEffect(() => {
        fetchCat()
    }, []);

    const fetchCat = async () => {
        const response = await axios.get(`${backendUrl}/category/Category`)
        setNewCategory(response.data)
    }

    console.log(newCategory)
    return (
        <div className="main1">

            <div className="header1">

                <div className="header01" class="bg-primary text-white header01">
                    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
                </div>

                <div className="header02">
                    <div className="headerLeft1">
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%',marginTop:'16px' }}>
                                    <Nav.Link ><p className="headerTitles1">HOME</p></Nav.Link>
                                    <Nav.Link ><p className="headerTitles1">SHOP BY PRODUCTS</p></Nav.Link>
                                    <Nav.Link ><p className="headerTitles1">SHOP BY ANIME</p></Nav.Link>
                                    <Nav.Link><p className="headerTitles1">COMBO</p></Nav.Link>
                                    <Nav.Link><p className="headerTitles1">NEW LAUNCH</p></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="headerRight1">
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                                    {/* <Nav.Link ><button className="btnsearch1"><CiSearch className="headerRightIcons111" />SEARCH</button></Nav.Link> */}
                                    <PopOverSearchButton/>
                                    <Nav.Link ><CiHeart className="headerRightIcons1" /></Nav.Link>
                                    <Nav.Link ><IoCartOutline className="headerRightIcons1" /></Nav.Link>
                                    <Nav.Link ><FaRegUser className="headerRightIcons11" /></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>


                </div>
            </div>

            <div className="center1">
                <h2>Center</h2>
            </div>

            <div className="footer1">
                        <div><h2>Footer</h2></div>
                        
            </div>
        </div>
    );
};


export default MyNavbar;
