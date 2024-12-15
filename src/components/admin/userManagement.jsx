import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import '../admin/UserManagement.css'
import { myContext } from '../context/Context'
import { backendUrl } from '../../utils/utils'


export default function UserManagement() {

    const {setBanBtn,banBtn } = useContext(myContext)
    
    const [user,setUser] = useState([])
    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        const response = await axios.get(`${backendUrl}/users/Users`)
        setUser(response.data)
    }
    

    const confirmDelete = async (id, deleteProd) => {
        if (window.confirm(`Are you want to delete this user, "${deleteProd}"?`)) {
            deleteCat(id);
        }
    }
    const deleteCat = async (id) => {
        try {
            await axios.delete(`${backendUrl}/users/Users/${id}`)
            fetchUser()
        }
        catch (error) {
            console.log(error)
        }
    }


    const banUser = async (users) => {
            if (window.confirm(`Are you want to ban this user, "${users.username}"?`)) {
            banNow(users)
        }
    }

    const banNow = async (users)=> {
        try{
        const response = await axios.post(`${backendUrl}/Users/banUser`,{userId:users._id,banned:true})
        window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    const UnbanUser = async (users) => {
        if (window.confirm(`Are you want to Unban this user, "${users.username}"?`)) {
            unBanNow(users)
        }
    }

    const unBanNow = async (users) => {
        try{
        const response = await axios.post(`${backendUrl}/Users/banUser`,{userId:users._id,banned:false})
        window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log("Bannede user",banBtn)
    console.log(user)
    

    return (

        <div className="mainP1" style={{width:'100%'}}>

            <div className="displayProducts" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'50px'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><h2 style={{ color: 'white' }}><u>Show User</u></h2></div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><h4 style={{ color: 'white' }}>Number of Users : {user.length}</h4></div>
        <hr style={{width:'100%',color:'white',marginTop:'20px'}} />

                <div className='dispProd' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' ,width:'100%',padding:'50px'}}>
                    
                        <table style={{width:'100%'}}>
                        <thead>
                            <tr>
                                <th className='tableHead'>User name</th>
                                <th className='tableHead'>Email</th>
                                <th className='tableHead'>Ban</th>
                                <th className='tableHead'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        user.map((users) => 
                        
                            <tr>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td style={{display:'flex',justifyContent:'space-evenly'}}>
                                   { users.bannedUser != true ? <button style={{borderRadius:'5px',width:'100px'}} onClick={()=>banUser(users)}>Ban</button> :
                                    <button style={{borderRadius:'5px',width:'100px'}} onClick={()=>UnbanUser(users)}>UnBan</button>}
                                </td>
                                <td><button style={{borderRadius:'5px',width:'100px'}} onClick={()=>confirmDelete(users._id,users.username)}>Delete</button></td>
                            </tr>
                        
                    
)
                    }
                    </tbody>
                    </table>
                    
                </div>

            </div>

        </div>
    )

}