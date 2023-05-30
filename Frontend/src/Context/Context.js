import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "./Constants";

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
  } catch (error) {
    console.log(error);
  }
};

//CREATING CONTEXT PROVIDER
export const InscribleProvider = ({ children }) => {
  const [isMetamask, setIsMetamask] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [isSignedin, setIsSignedin] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [singleUserPost, setSingleUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserLists] = useState([]);
  const [friendLists, setFriendLists] = useState([]);
  const [error, setError] = useState("");
  const [tipAmountState,setTipAmountState] = useState(0);

  //FUNCTION TO GET THE CONNECTED ACCOUNT
  const ConnectWallet = async () => {
    try {
      if (!window.ethereum) return setIsMetamask(false);

      window.ethereum.on("chainChanged", () => {
        signInState(false);
        window.location.reload(true);
      });
      window.ethereum.on("accountsChanged", () => {
        signInState(false);
        console.log("in wallet...........");
        window.location.reload(true);
      });

      //GETTING ACCOUTNS ARRAY FROM ETHEREUM/METAMASK
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      //GETTING FIRST ACCOUNT FROM ACCOUNTS ARRAY
      const firstAccount = accounts[0];
      setConnectedAccount(firstAccount);

      const _contract = await CreateContract();

      setContract(_contract);
    } catch (error) {
      console.log(error);
    }
  };
  //ADD YOUR FRIENDS
  const addFriends = async ({ accountAddress }) => {
    try {
      // const contract = await ConnectWallet();
      const addMyFriend = await contract.addFriend(accountAddress);
      await addMyFriend.wait();
      console.log("Connect wallet called !!!");
      const friendLists1 = await contract.getMyFollowersList();
      const followingList = await contract.getMyFollowingsList();
      console.log("FollowingsList  ",followingList);
      setFriendLists(friendLists1);
      //console.log("this is from connect wallet FriendList");
      console.log("FollowersList  ",friendLists1);
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  const checkAlreadyFriend = async ({
    connectedAccountAddress,
    accountAddress,
  }) => {
    try {
      console.log(contract);
      console.log(connectedAccountAddress + "          " + accountAddress);
      const checkFriend = await contract.checkAlreadyFriends(
        connectedAccountAddress,
        accountAddress
      );
      console.log("is friends " + checkFriend);

      console.log("is friends " + checkFriend);
      return checkFriend;
    } catch (error) {
      console.log(error);
      setError("Something went wrong while adding friends, try again");
      console.log("Something went wrong while adding friends, try again");
      return false;
    }
  };

  //check is user already exits

  const removeFriends = async ({ accountAddress }) => {
    try {
      // const contract = await ConnectWallet();
      const removeMyFriend = await contract.removeFriend(accountAddress);
      await removeMyFriend.wait();
      console.log("Connect wallet called !!!");
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      console.log("this is from connect wallet FriendList");
      console.log(friendLists);
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  //arishaaaaaaas function
  const tip = async (post_id) => {
    // tip post owner
      await ConnectWallet();
      await (await contract.tipPostOwner(post_id, {value: ethers.utils.parseEther("0.00001"),})
     ).wait();

    const tipAmount = await contract.getTipAmountByPostId(post_id)
    console.log('Data:', parseInt(tipAmount._hex, 16) / 10 ** 18);
    setTipAmountState(parseInt(tipAmount._hex, 16) / 10 ** 18);
    
     //console.log("tipppppppppppppppp",parseInt(tipAmount._hex, 16) / 10 ** 18);
     //GetPostByUser(connectedAccount);
    
  };

  const like = async (post_id) => {
    const liked = await(await contract.incrementLike(post_id)).wait();
    console.log("Liked.........." , liked);
    GetPostByUser(connectedAccount);

  };

  const RegisterUser = async (username) => {
    const createdUser = await contract.createAccount(username);
    await createdUser.wait();
  };

  const CheckIfUserIsRegistered = async (account) => {
    const isUser = await contract.checkUser(account);
    if (isUser) {
      return true;
    } else {
      return false;
    }

  };

  const signInState = (state) => {
    setIsSignedin(state);

    localStorage.setItem("isSignedIn", JSON.stringify(state));
  };
  const getAllAppUser = async () => {
    console.log("GetAllUser function called");

    setIsLoading(true);
    const userList = await contract.getAllAppUser();
    // console.log(userList[1].accountAddress);
    setUserLists(userList);

    console.log("userList");

    setIsLoading(false);
  };
  const getSignInState = () => {
    return JSON.parse(localStorage.getItem("isSignedIn"));
  };

  const ValidateUsername = async (username) => {
    const _username = await contract.getUsername(connectedAccount);

    if (username === _username) {
      setCurrentUsername(_username);
      return true;
    } 
    else {
      return false;
    }
  };

  const UploadPost = async (imageHash, caption, imageText) => {
    setIsLoading(true);
    const uploaded = await contract.addPostImage(imageHash, caption, imageText);
    await uploaded.wait();
    setIsLoading(false);
  };

  const GetAllPosts = async () => {
    setIsLoading(true);
    const Posts = await contract.GetAllPosts();
    setAllPosts(Posts);
    setIsLoading(false);
  };

  const GetPostByUser = async (address) => {
    console.log(contract);
    console.log(address);
    console.log(connectedAccount);
    setIsLoading(true);

    //const followingsCount = await contract.getMyFollowingsList(address);
    //console.log("FollowingsCount.....",followingsCount);


    const followingsList = await contract.getMyFollowingsList(address);
    console.log("followings address",followingsList);
    let Posts = [];
    for (let i = 0 ; i<followingsList.length ; i++){
        //let PostsOfOneUser = await contract.getOneUserPosts(followingsList[i]);
        let PostsOfOneUser = await contract.getOneUserPosts(followingsList[i].pubkey);
        for (let j = 0 ; j < PostsOfOneUser.length ; j++){
           Posts.push(PostsOfOneUser[j]);
        }
    }
    setSingleUserPost(Posts);
    setIsLoading(false);
  
  };

  useEffect(() => {
    const getAccount = async () => {
      await ConnectWallet();
    };
    getAccount();
  }, [isMetamask]);

  return (
    <InscribleContext.Provider
      value={{
        ConnectWallet,
        RegisterUser,
        CheckIfUserIsRegistered,
        signInState,
        getSignInState,
        ValidateUsername,
        setIsSignedin,
        UploadPost,
        setIsLoading,
        GetAllPosts,
        GetPostByUser,
        getAllAppUser,
        setFriendLists,
        addFriends,
        removeFriends,
        tip,
        like,
        setTipAmountState,
        tipAmountState,
        isMetamask,
        connectedAccount,
        contract,
        isSignedin,
        currentUsername,
        allPosts,
        singleUserPost,
        isLoading,
        friendLists,
        userList,
        
        checkAlreadyFriend,
      }}
    >
      {children}
    </InscribleContext.Provider>
  );
};
