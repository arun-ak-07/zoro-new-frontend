import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../context/Context";

 const DropdownBox = () => {
    // Content of your dropdown box
    const nav = useNavigate()
    const { products } = useContext(myContext)
    const anime=[...new Set(products.map(data=>data.anime))]
    // function handleSelect(e){
    //     const query=e.target.value
    //     const query1=query.split(" ").join("_")
    //     nav(`/Products/${query1}`)
    // }
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
                height: '230px',
                width: '400px',
                // background:'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'center' // Center content vertically
            }}
        >
            <div className="leftDropDwon"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '20px', backgroundColor: 'black' }}>
                <Link className='linksNH' to={(`/Products/${anime[0]}`)}>NARUTO</Link>
                <Link className='linksNH' to={(`/Products/${anime[4]}`)}>ONE PIECE</Link>
                <Link className='linksNH' to={(`/Products/${anime[2]}`)}>JUJUSTU KAISEN</Link>
                <Link className='linksNH' to={(`/Products/${anime[3]}`)}>TOKYO REVENGERS</Link>
            </div>
            <div className="rightDropDown"
                style={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNH' to={(`/Products/${anime[5]}`)}>DRAGON BALL</Link>
                <Link className='linksNH' to={(`/Products/${anime[6]}`)}>ATTACK ON TITAN</Link>
                <Link className='linksNH' to={(`/Products/${anime[1]}`)}>DEMON SLAYER</Link>
            </div>

        </div>
    );
};
export default DropdownBox