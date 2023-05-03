//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Inscrible {
    
    //USER STRUCT
    struct User{
        string username;
        address userAddress;
        // string profilePic; do add later
    }

    //POST COUNT
    uint postCount = 0;

    //CONTAINING ALL THE POSTS UPLOADED BY USERS
    struct Post{
        string createrName;
        address payable userAddress;
        string imageHash;
        string caption;
        string imageText;
        uint256  tipAmount;
        uint256 id;
        uint likeCount;
        string [] likedByUser;
    }


    mapping(address=>User) userList;
    User [] allRegisteredUsers;
    mapping(address=>Post[]) singleUserPostList;
    Post [] allposts;


    //FUNCTIONS----------------------------

    //CHECK IS A USER HAS AN ACCOUNT
    function checkUser(address key) public view returns(bool){
        if(allRegisteredUsers.length > 0)
        return bytes(userList[key].username).length > 0;
        else{
            return false;
        }
    }

    //GET USER NAME
    function getUsername(address key) public view returns(string memory){
        return userList[key].username;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata _username) external {
        require(checkUser(msg.sender) == false, "User alredy has an account!");
        require(bytes(_username).length > 0, "User name should not be empty!");

        userList[msg.sender].username = _username;
        allRegisteredUsers.push(User(_username, msg.sender));
    }

    //TO POST IMAGES TO BLOCKCHAIN
    function addPostImage(string memory _imgHash, string memory desc, string memory imgText) public 
    {   
        require(checkUser(msg.sender), "User not registered!");
        require(bytes(_imgHash).length > 0);
        postCount++;
        Post memory newPost = Post({
            createrName: userList[msg.sender].username,
            userAddress: payable(msg.sender),
            imageHash: _imgHash,
            caption: desc,
            imageText: imgText,
            tipAmount:0,
            id:postCount,
            likeCount:0,
            likedByUser : new string[](0)         
        });

        singleUserPostList[msg.sender].push(newPost);
        allposts.push(newPost);
    }

    function getAllPosts() public view returns(Post [] memory){
        return allposts;
    }

    function getSingleUserPost(address key) public view returns(Post [] memory) {
        return singleUserPostList[key];
    }

    function getSingleUserLatestPost(address key) public view returns(Post memory){
        return  singleUserPostList[key][singleUserPostList[key].length-1]; 
    } 

    receive() external payable {}
}