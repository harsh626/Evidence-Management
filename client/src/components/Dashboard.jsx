import {React, useState} from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

// import { contractABI, contractAddress } from '../../utils/constants';

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const evidenceContract = new ethers.Contract(contractAddress, contractABI, signer);

    return evidenceContract;
}

const Dashboard = ({ evidences, cases }) => {

    const [currentAccount , setCurrentAccount] = useState('');

    const connectWallet = async () => {
    try {
        if(!ethereum) return alert("Please Install MetaMask");

        const accounts = await ethereum.request({ method : 'eth_requestAccounts'});

        setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error);
        
        throw new Error("No Ethereum Object")
    }

}

    const fetchEvidences = async () => {
        if(!ethereum) return alert("Please Install MetaMask");

        const evidenceContract = getEthereumContract();

        const id = 1

        const evidence = await evidenceContract.getEvidence(id);
    }


    return (
        <div>
            <div className="bg-[#efefef]">
                <div className='md:container md:mx-auto flex justify-between items-center h-[4rem]  px-4 text-3xl'>
                    <p>Evidence It!</p>
                    <div>
                        {!currentAccount && (<button type="button" onClick={connectWallet} id="button-connect" className="ml-20 py-2 px-7 rounded-full cursor-pointer hover:bg-[#fffedc] hover:text-red-800">
                            <p className="text-black text-base font-semibold ">Connect Wallet</p>
                        </button>)}
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
                    cases.map((c)=>{
                        return (
                                <div className='h-[7rem] border-rounded bg-[#efefef] mt-10 p-4'>
                                    <div className='flex justify-between'>
                                        <Link to={`/casedetails/${c.id}`}>
                                            <p>{c.id}</p> 
                                        </Link>
                                        <p>{c.status}</p>
                                    </div>
                                    
                                    <div>
                                    <p>{c.name}</p>
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