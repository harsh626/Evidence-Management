import React from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import hero from '../imgs/hero.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="">
            {/* Navbar */}
            <div className="bg-[#efefef]">
                <div className='md:container md:mx-auto flex justify-between items-center h-[4rem]  px-4 text-3xl'>
                    <p>Evidence It!</p>
                    <AiOutlineMenuFold />
                </div>
            </div>
            <div className='md:container md:mx-auto ' style={{ marginTop: '4rem' }}>
                <div className='flex justify-content-center'>
                    <p className='text-4xl mx-auto '>Our work transforms businesses</p>
                </div>
                <div className='flex justify-content-center'>
                    <p className='text-lg mx-auto mt-5'>We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action.</p>
                </div>  
                <div class="h-[60vh] grid grid-rows-2 grid-cols-3 grid-flow-col gap-4 bg-slate-300" style={{ marginTop: '4rem' }}>
                    <div class="row-span-1 p-[40px]">
                        <div className='bg-[#E0E5EB] h-[100px] w-[100px] rounded-full '></div>
                        <p className='italic mt-5'>We blend creative and strategic thinking to solve problems, grounding everything in robust, logical, fact-based insights. </p>
                    </div>
                    <div class="row-span-1">
                        <div class="row-span-1 p-[40px]">
                            <div className='bg-[#E0E5EB] h-[100px] w-[100px] rounded-full '></div>
                            <p className='italic mt-5'>We blend creative and strategic thinking to solve problems, grounding everything in robust, logical, fact-based insights. </p>
                        </div>
                    </div>
                    <div class="row-span-2 ">
                        <img className="object-cover" src={hero} />
                    </div>
                    <div class="row-span-1 ">
                    <div class="row-span-1 p-[40px]">
                        <div className='bg-[#E0E5EB] h-[100px] w-[100px] rounded-full '></div>
                            <p className='italic mt-5'>We blend creative and strategic thinking to solve problems, grounding everything in robust, logical, fact-based insights. </p>
                        </div>
                    </div>
                    <div class="row-span-1 ">
                    <div class="row-span-1 p-[40px]">
                        <div className='bg-[#E0E5EB] h-[100px] w-[100px] rounded-full '></div>
                        <   p className='italic mt-5'>We blend creative and strategic thinking to solve problems, grounding everything in robust, logical, fact-based insights. </p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-content-center'>
                    <Link to="/login"><button className='border rounded-2xl bg-black text-white p-4 mt-5'>Login to continue</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home;