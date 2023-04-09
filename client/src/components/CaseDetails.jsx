import { React, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import './tracking.css';
import AES from 'crypto-js/aes';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../../utils/constants';

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const evidenceContract = new ethers.Contract(contractAddress, contractABI, signer);

    return evidenceContract;
}


const CaseDetails = ({ evidences, cases }) => {

    const [base64, setBase64] = useState('');
    const [custodian, setCustodian] = useState('');
    const [evidenceName, setEvidencename] = useState('');

    const open_form = () => {
        document.getElementById('form').classList.remove('hidden');
    }

    const file_open = ()=>{
        const fileInput = document.getElementById('file_input');
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // return reader.result;
                setBase64(reader.result);
                // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(selectedFile);
            console.log(base64);
        }
        // setEvidences([...evidences, {
        //     id: evidences.length()+1,
        //     name: evidenceName,
        //     custodian: 'ABC',
        //     custodianRole: 'lawyer',
        //     base64Image: base64,
        //     verified: false,
        // }])
        
        // let evidenceList = cases[0].evidences;
        // evidenceList.push(evidences.length()+1);
        // setCases(cases[0].evidences)

    }

    const submit = () => {
        const hashed = AES.encrypt(base64, 'secret key').toString();
        const data = {
            id: 2,
            name: evidenceName,
            custodian: 'Name of Custodian',
            custodianRole: 'investigator',
            description: "This is the description of the evidence",
            hash: hashed
        }
        const evidenceContract = getEthereumContract()
        evidenceContract.submitEvidence(2, evidenceName, "This is the description of the evidence", hashed)


        console.log(data);
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
                <p className='text-3xl'>{cases[0].name}</p>
                <button onClick={open_form} className='border bg-black text-white w-[8rem] rounded-lg' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Evidence</button>
            </div>

            <div className='hidden w-[30vw] border p-3 ml-[35vw]' id='form'>
                <label className="form-label">Evidence Name: </label><input name="" className='form-control' onChange={(e)=>setEvidencename(e.target.value)} />
                <label className="form-label mt-3">Upload Evidence: </label><input type="file" className='form-control ' name="file" id="file_input" onClick={()=>setBase64(file_open)}  />
                <button type="button" className="btn btn-primary mt-3 border p-2" onClick={submit}>Submit</button>
            </div>

            {/* evidence list */}
            <div className='my-3 '>
                {
                    evidences.map((evidence, index)=>{
                        if(evidence.id==1){
                            return (
                                <div className="container flex justify-content-center">
                                    <div className='border rounded-lg bg-[#efefef] w-[30%] p-2'>
                                        <p className='flex justify-content-center'>Evidence No. : {index}</p>
                                        <p className='flex justify-content-center'>{evidence.name}</p>
                                        <p className='flex justify-content-center'>{evidence.custodian}</p>
                                    </div>  
                                </div>
                            )
                        } else {
                            return (
                                <>
                                    <div className='grid grid-cols-2 h-[50px]'>
                                        <div className='col-span-1 border-r border-black'></div>
                                        <div className=''></div>
                                    </div>
                                    <div className="container flex justify-content-center">
                                        <div className='border rounded-lg bg-[#efefef] w-[30%] p-2'>
                                            <p className='flex justify-content-center'>Evidence No. : {index}</p>
                                            <p className='flex justify-content-center'>{evidence.name}</p>
                                            <p className='flex justify-content-center'>{evidence.custodian}</p>
                                        </div>  
                                    </div>
                                </>
                            )
                            
                        }
                    })
                }
            </div>

        </div>
    )
}

export default CaseDetails;