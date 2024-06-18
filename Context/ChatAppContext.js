import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT 
import { 
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract 
}from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    const [account, setAccount] = useState("")
    const [userName, setUserName] = useState("")
    const [friendLists, setFriendLists] = useState([])
    const [friendMsg, setFriendMsg] = useState([])
    const [loading, setLoading] = useState(false)
    const [userLists, setUserLists] = useState([])
    const [error, setError] = useState("")

    //chat user data
    const [currentUserName, setCurrentUserName] = useState("")
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    const router = useRouter()
    
    //fetch data time of page load
    const fetchData = async() => {
        try {
            //get contract
            const contract = await connectingWithContract()
            //get account
            const connectAccount = await connectWallet()
            setAccount(connectAccount)
            //get username
            const userName = await contract.getUsername(connectAccount)
            setUserName(userName)
            //get my fr list
            const frienfLists = await contract.getMyFriendList()
            setFriendLists(frienfLists)
            //get all app user list 
            const userList = await contract.getAllAppUser()
            setUserLists(userList)
        } catch (error) {
            setError("pls install and connect your wallet")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    //read message
    const readMessage = async(friendAddress)=>{
        try {
            const contract = await connectingWithContract()
            const read = contract.readMessage(friendAddress)
            setFriendMsg(read)
        } catch (error) {
            setError("Current you have no message")
        }
    }

    //create account
    const createAccount = async({name, accountAdress})=>{
        try {
            // if(name || accountAdress) return setError("name and accountAddress can be emty")
            const contract = await connectingWithContract()
            const getCreateUser = await contract.createAccount(name)
            setLoading(true)
            await getCreateUser.wait()
            setLoading(false)
            window.location.reload()
        } catch (error) {
            setError("error while creating your account, pls reload browser")
            console.log(error)
        }
    }

    //add your friend
    const addFriends = async({name, accountAdress})=> {
        try {
            if(name || accountAdress) return setError("Pls provide data")

            const contract = await connectingWithContract()
            const addMyFriend = await contract.addFriend(accountAdress, name)
            setLoading(true)
            await addMyFriend.wait()
            setLoading(false)
            router.push('/')
            window.location.reload()
        } catch (error) {
            setError("something went wrong while adding friends, try again")   
        }
    }

    //send message to your friend
    const sendMessage = async({msg, address})=> {
        try {
            if(msg || address) return setError("pls type your message")

            const contract = await connectingWithContract()
            const addMessage = contract.sendMessage(address, msg)
            setLoading(true)
            await addMessage.wait()
            setLoading(false)
            window.location.reload()
        } catch (error) {
            setError("Pls reload and try again")
        }
    }

    //read info
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract()
        const userName = contract.getUsername(userAddress)
        setCurrentUserName(userName)
        setCurrentUserAddress(userAddress)
    }

    return(
        <ChatAppContext.Provider value={
            {readMessage,
            createAccount, 
            addFriends, 
            sendMessage, 
            readUser,
            connectWallet,
            checkIfWalletConnected,
            account,
            userName,
            friendLists,
            friendMsg,
            userLists,
            currentUserName,
            currentUserAddress,
            loading,
            error
            }
        }>
            {children}
        </ChatAppContext.Provider>
    );
}