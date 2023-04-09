import { React, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import './tracking.css';

const CaseDetails = ({ evidences, cases, setEvidences, setCases }) => {

    const [base64, setBase64] = useState('');
    const [custodian, setCustodian] = useState('');
    const [evidenceName, setEvidencename] = useState('');

    const file_open = ()=>{
        const fileInput = document.getElementById('file_input');
        fileInput.click()
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();
            let base64 = "";
            reader.onloadend = () => {
                setBase64(reader.result);
                // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(selectedFile);
        }
        setEvidences([...evidences, {
            id: evidences.length()+1,
            name: evidenceName,
            custodian: custodian,
            base64Image: base64,
            verified: false,
        }])
        let evidenceList = cases[0].evidences;
        evidenceList.push(evidences.length()+1);
        setCases(cases[0].evidences)
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
                {
                    evidences.map((index, evidence)=>{
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