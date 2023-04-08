import React from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const digits = [1, 2, 3, 4];

    return (
        <div>
            <div className="bg-[#efefef]">
                <div className='md:container md:mx-auto flex justify-between items-center h-[4rem]  px-4 text-3xl'>
                    <p>Evidence It!</p>
                    <div>
                        <button className='btn btn-dark'>Connect Wallet</button>
                    </div>
                    <AiOutlineMenuFold />
                </div>
                
            </div>
            <div className='md:container md:mx-auto'>
                <div className='mt-10'>
                    <p className="text-2xl p-4">Hello Username</p>
                    <p></p>
                </div>
                {
                    digits.map((d)=>{
                        return (
                                <div className='h-[5rem] border-rounded bg-[#efefef] mt-10 p-4'>
                                    <div className='flex justify-between'>
                                        <Link to='/casedetails/1'>
                                            <p>Case ID</p> 
                                        </Link>
                                        <p>status</p>
                                    </div>
                                    
                                    <div>
                                    <p>Case Name</p>
                                    </div>                    
                                </div>
                            
                        )
                    })
                    
                }
            </div>
        </div>
    )
}

export default Dashboard;