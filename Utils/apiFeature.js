import { ethers } from "ethers";
import Web3modal from "web3modal";

import { chatAppAddress, ChatAppABI, ChatAppAddress } from "../Context/constants";

export const checkIfWalletConnected = async () => {
    try {
        if(!window.ethereum) return console.log("Install MateMask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

export const connectWallet = async () => {
    try {
        if(!window.ethereum) return console.log("Install MateMark");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(ChatAppABI, ChatAppAddress, signerOrProvider);


export const connectingWithContract = async () => {
    try{
        const web3modal = new web3modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    } catch (error) {
        console.log(error);
    }
};



export const converTime = (time) => {
    const newTime = new Date(time.toNumber());

    const realTime = 
        newTime.getHours() + 
        "/" +
        newTime.getMinutes() + 
        "/" +
        newTime.getSeconds() +
        "Date:" +
        newTime.getDate() +
        "/" +
        (newTime.getMonth() + 1) +
        "/" +
        newTime.getFullYear();

    return realTime;
}