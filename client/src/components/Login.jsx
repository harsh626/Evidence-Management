import { React, useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const users = [
        {
            'username': 'inspector1',
            'email': 'colaba@police.com',
            'password': 'abcd',
            'role': 'investigator',
        },
        {
            'username': 'lawyer01',
            'email': 'lawyer@lawyer.com',
            'password': 'law',
            'role': 'lawyer',
        },
        {
            'username': 'courtrep',
            'email': 'court@legal.com',
            'password': 'pqrs',
            'role': 'court_representative',
        },
        {
            'username': 'expert1',
            'email': 'forensic@expert.com',
            'password': 'mnop',
            'role': 'expert',
        }
    ]

    const findOne = ()=>{
        for(let user of users){
            console.log(user);
            if(user.password===password){
                return user;
            }
        }
        return "";
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {

        alert(password)

        try {
            if ( username.length==0 || password.length==0 ) {
                alert('Please enter email and password')
            }

            const user = findOne();
            console.log(user);

            if (user) {
                if (user.password===password) {
                    navigate('/dashboard')
                } else {
                   
                        alert("Please enter correct credentials")
                }
            }
            else {
                
                    alert("User does not exist..!")
            }
            }
        

        catch (err) {
            alert('Bad Request')
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
        
                <div><button type="submit" className='border mt-3 p-2' onClick={login}>Login</button></div>

            </div>
        
      </div> 
    )

    }

export default Login