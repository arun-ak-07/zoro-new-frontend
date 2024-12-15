import { Link } from "react-router-dom";
import { myContext } from "../context/Context";
import { useContext } from "react";

const DropdownBox1 = () => {
    // Content of your dropdown box
    const { products } = useContext(myContext)
    const category=[...new Set(products.map(data=>data.category))]
    return (
        <div className="dropdown-box"
        
            style={{
                position: 'absolute',
                top: 'calc(80% + 5px)', // Adjust the distance below the link
                left: '50%', // Center horizontally relative to the link
                transform: 'translateX(-50%)', // Center horizontally
                zIndex: 999,
                backgroundColor: 'black',
                // boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                padding: '10px', // Add padding for better appearance 
                height: '250px',
                width: '400px',
                // background:'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'center', // Center content vertically
                marginLeft:'160px'
            }}
        >
            <div className="leftDropDwon"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '50px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>T-SHIRTS</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[0]}`)}>Oversized T-Shirts</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[8]}`)}>Plain T-Shirt</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[7]}`)}>Tank Top</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[2]}`)}>Printed T-Shirt</Link>
            </div>
            <div className="centerDropDown"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>WINTER WEARS</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[6]}`)}>Hoodies</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[5]}`)}>Jackets</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[1]}`)}>Sweatshirt</Link>
                <Link className='linksNDH' to={(`/ProductsDisplay/${category[9]}`)}>Solids</Link>
            </div>
            {/* <div className="rightDropDown"
                style={{ height: '100%', width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>ACCESSORIES</Link>
                <Link className='linksNDH'>Shoes</Link>
                <Link className='linksNDH'>Caps</Link>
                <Link className='linksNDH'>Keychains</Link>

            </div> */}

        </div>
    );
};
export default DropdownBox1