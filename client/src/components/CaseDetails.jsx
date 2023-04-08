import { React, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import './tracking.css';

const CaseDetails = () => {

    const file_open = ()=>{
        alert('aiubu')
        const fileInput = document.getElementById('file_input');
        fileInput.click()
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();
            let base64 = "";
            reader.onloadend = () => {
                base64 += reader.result;
                // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(selectedFile);
            console.log(base64)
        }
    }

    return (
        <div>
            <div className="bg-[#efefef]">
                <div className='md:container md:mx-auto flex justify-between items-center h-[4rem]  px-4 text-3xl'>
                    <p>Evidence It!</p>
                    <AiOutlineMenuFold />
                </div>
                
            </div>

            <div className="md:container md:mx-auto px-4  mt-10 flex justify-between">
                <p className='text-3xl'>Case Name</p>
                <button onClick={file_open} className='border bg-black text-white w-[8rem] rounded-lg' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Evidence</button>
                <input type="file" name="file" hidden id="file_input"/>
            </div>

            {/* evidence list */}
            <div className='mt-3'>
                <div className="container flex justify-content-center">
                    <div className='border rounded-lg bg-[#efefef] w-[30%] p-2'>
                        <p className='flex justify-content-center'>Evidence No. 1</p>
                        <p className='flex justify-content-center'>Evidence Details</p>
                    </div>  
                </div>
                <div className='grid grid-cols-2 h-[50px]'>
                    <div className='col-span-1 border-r border-black'></div>
                    <div className=''></div>
                </div>
                <div className="container flex justify-content-center">
                    <div className='border rounded-lg bg-[#efefef] w-[30%] p-2'>
                        <p className='flex justify-content-center'>Evidence No. 2</p>
                        <p className='flex justify-content-center'>Evidence Details</p>
                    </div>  
                </div>
                <div className='grid grid-cols-2 h-[50px]'>
                    <div className='col-span-1 border-r border-black'></div>
                    <div className=''></div>
                </div>
                <div className="container flex justify-content-center">
                    <div className='border rounded-lg bg-[#efefef] w-[30%] p-2'>
                        <p className='flex justify-content-center'>Evidence No. 3</p>
                        <p className='flex justify-content-center'>Evidence Details</p>
                    </div>  
                </div>
            </div>

        </div>
    )
}

export default CaseDetails;