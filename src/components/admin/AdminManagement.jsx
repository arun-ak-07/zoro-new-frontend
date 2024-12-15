import { useContext, useState } from 'react'
import '../admin/AdminManagement.css'
import Product from './Product'
import Button from 'react-bootstrap/esm/Button'
import CategoryManagement from './CategoryManagement'
import UserManagement from './userManagement'
import { myContext } from '../context/Context'
import Shoe from './Shoe'
import { Link } from 'react-router-dom'

const AdminManagement = () => {

    const {productType,setProductType} = useContext(myContext)
    const [management,setManagement] = useState("Products")
    function prodMan(){
        setManagement("Products")
    }
    function catMan (){
        setManagement("Category")
    }
    function userMan(){
        setManagement("User")
    }
    return (

        <div className="mainP1">

                <div className='topP' style={{textAlign:'center'}}>
                    <h1 style={{color:'white',marginLeft:'500px'}}>Admin Management</h1>
                    <div><Link to={'/'} style={{marginLeft:'400px'}}>Admin Logout</Link></div>
                </div>

                <div className="mainP">
                <div className="leftSectionP">
                    <div className='prodBtnP'>
                        <Button variant="danger" style={{borderRadius:'5px'}} onClick={prodMan}>Product Management</Button>
                    </div>
                    <div className='prodBtnP'>
                        <Button variant="danger" style={{borderRadius:'5px'}} onClick={catMan}>Category Management</Button>
                    </div>
                    <div className='prodBtnP'>
                        <Button variant="danger" style={{borderRadius:'5px'}} onClick={userMan}>User Management</Button>
                    </div>

                </div>

                <div className="rightSectionP">
                    {
                        management === "Products" && productType === "t-shirt" ?
                        
                            <Product/> : false
                    }
                    {
                        management === "Products" && productType === "shoes" ?
                        
                            <Shoe/> : false
                         
                    }
                    {
                        management === "Category" ? <CategoryManagement/> : false
                    } 
                    {
                        management === "User" ? <UserManagement/> : false
                    }

                </div>

            </div>

        </div>
    )
}
export default AdminManagement