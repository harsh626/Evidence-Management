import { React, useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginReq = () => {
        alert('requesting server');
        let res = "asve";
        // const res = axios.post('http://localhost:xxxx/login', {'username': username, 'password': password});
        if(res.length!=0){
            // set cookies
            navigate('/dashboard')
        } else {
            alert('wrong credentials')
        }
    }


    return (
        <div className='container mx-auto mt-[10%] w-[30vw] border' style={{ width: "30vw" }}>
            <div className="flex justify-content-center container">
                <p className='mx-auto text-2xl'>Login</p>
            </div>
      
            <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" name="uname" required />
            
                <label for="psw"><b>Password</b></label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" name="psw" required />
        
                <div><button type="submit" className='border mt-3 p-2' onClick={loginReq}>Login</button></div>

            </div>
        
                <div className="container" style={{backgroundColor:"#f1f1f1"}}>
                <button type="button" className="cancelbtn rounded-lg"><Link to={'/'}>Go Back</Link></button>
            </div>
      </div> 
    )
  }

export default Login