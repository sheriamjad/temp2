import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from './Constants';

//CREATING CONTEXT
export const InscribleContext = React.createContext();


const FetchContract = (signerProvider) =>
    new ethers.Contract(contractAddress, contractABI, signerProvider);

//FUNCTION TO CREATE CONTRACT
const CreateContract = async () => {
    try {
        //CREATING A ETHEREUM PROVIDER AND GETTING THE SIGNER
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        //SENDING THE SIGNER TO FetchContract FUNCTION TO GET THE SMART CONTRACT
        const contract = FetchContract(signer);

        return contract;
    } 
    catch (error) {
        console.log(error);
    }
};


//CREATING CONTEXT PROVIDER
export const InscribleProvider = ({ children }) => {

    const [isMetamask, setIsMetamask] = useState(true);
    const [connectedAccount, setConnectedAccount] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    //FUNCTION TO GET THE CONNECTED ACCOUNT
    const ConnectWallet = async () => {
        try {
            if (!window.ethereum) return setIsMetamask(false);

            window.ethereum.on("chainChanged", () => {
                window.location.reload();
              });
              window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
            //GETTING ACCOUTNS ARRAY FROM ETHEREUM/METAMASK
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });

            //GETTING FIRST ACCOUNT FROM ACCOUNTS ARRAY
            const firstAccount = accounts[0];
            setConnectedAccount(firstAccount);
        } 
        catch (error) {
            console.log(error);
        }
    };

    const CheckIfUserIsRegistered = async (account)=>{
        const contract = await CreateContract();
        await contract.wait();

        const isUser = contract.checkUser(account);

        if (isUser) {
          setIsRegistered(true);
        }
    };

    useEffect(()=>{
        ConnectWallet();
    },[]);

    return (
        <InscribleContext.Provider
            value={{
              ConnectWallet,
              CheckIfUserIsRegistered,
              isMetamask,
              connectedAccount,
              isRegistered
            }}
        >
            {children}
        </InscribleContext.Provider>
    );
};