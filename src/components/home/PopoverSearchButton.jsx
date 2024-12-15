
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Offcanvas, Container, Nav } from 'react-bootstrap';
import { CiSearch } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { myContext } from '../context/Context';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { backendUrl } from '../../utils/utils';

const PopOverSearchButton = () => {
    const { products, setSearchItem,searchItem, serInp, setSerInp } = useContext(myContext)
    const [show, setShow] = useState(false);

    const nav = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function searchInput(a) {
        setSerInp(a.target.value)

    }
    const inputRef = useRef(null)
    let inputValue = '';
    // console.log("Products",products)

    // useEffect(() => {
    //     localStorage.setItem('searchInput',serInp)
    // },[serInp])

    useEffect(() => {
        localStorage.setItem('searchItem', JSON.stringify(searchItem));
    }, [searchItem]);

    async function handleSearch() {
        // if(serInp){
            inputValue = inputRef.current.value
            console.log("Input")
            const response = await axios.get(`${backendUrl}/Product/searchProducts`, {
            params: {
                q: inputValue,
                // criteria: searchCriteria.join(',') // Convert array to comma-separated string
            }
        });
        setSearchItem(response.data)
        // localStorage.setItem('searchItem', JSON.stringify(searchItem));
        // localStorage.setItem('searchItem', JSON.stringify(searchItem));
        // history.push('/searchItem')
        nav('/SearchItem')
        handleClose()
        // }
    }
    
        // if (serInp === null || serInp === "") {
        // }
        // else {
        //     const query = serInp
        //     setSerInp(query)
        //     const filteredResults = products.filter((user) => {
        //         const { name, price, category, anime } = user

        //         return (
        //             name.toLowerCase().includes(query.toLowerCase()) ||
        //             price.toString().includes(query) ||
        //             category.toLowerCase().includes(query.toLowerCase()) ||
        //             anime.toLowerCase().includes(query.toLowerCase())
        //         )
        //     })
        //     setSearchItem(filteredResults)
            
            // nav('/SearchItem')
            // setSerInp('')
            
        // }
    
    // console.log("FIltered",searchItem)
    return (
        <>
            <Link>
                <IoSearchOutline className="headerRightIcons111" onClick={handleShow} />
            </Link>

            <Offcanvas show={show} onHide={handleClose} placement="top">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>What are you looking for?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        <input style={{ width: '100%', borderRadius: '5px', border: '1px thin', height: '50px' }} onChange={searchInput} ref={inputRef} class="input-group__field search__input" type="search" name="q" placeholder="Search for products, brands and more" value={serInp} autocomplete="off" />
                        <Nav.Link ><CiSearch onClick={handleSearch} style={{ color: 'black', fontSize: '40px', marginLeft: '8px' }} className="headerRightIcons111" /></Nav.Link>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default PopOverSearchButton;
