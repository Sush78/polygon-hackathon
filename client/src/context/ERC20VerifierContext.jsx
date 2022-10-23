import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const Erc20VerifierContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com") //new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const erc20VerifierContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({erc20VerifierContract})
  return erc20VerifierContract;
};

export const Erc20VerifierProvider = ({ children }) => {

    const [loader, setLoader] = useState(false)
    const [toastmsg, setToastmsg] = useState("")

    const handleEvent = (user_address, evaluation) => {
        console.log(user_address, evaluation)
        if(evaluation) setToastmsg(`User verified: ${user_address}`)
        else setToastmsg(`Validation failed for user: ${user_address}`)
    }
    
    const checkMintEvent = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const erc20VerifierContract = createEthereumContract()
        erc20VerifierContract.on("TransactionResult", handleEvent)
      } catch (error) {
        console.log(error);
        //throw new Error("No ethereum object");
      }
    };
  
    useEffect(() => {
        checkMintEvent()
    }, []);
  
    return (
      <Erc20VerifierContext.Provider
        value={{
            checkMintEvent,
            toastmsg
        }}
      >
        {children}
      </Erc20VerifierContext.Provider>
    );
  };