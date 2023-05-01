//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Inscrible {
    
    //USER STRUCT
    struct User{
        string username;
        address userAddress;
        // string profilePic; do add later
    }

    mapping(address=>User) userList;
    User [] allRegisteredUsers;


    //FUNCTIONS----------------------------

    //CHECK IS A USER HAS AN ACCOUNT
    function checkUser(address key) public view returns(bool){
        // require(allRegisteredUsers.length > 0, "Userlist is empty");
        for (uint256 i = 0; i < allRegisteredUsers.length; i++) {
            if(allRegisteredUsers[i].userAddress == key){
                return true;
            }
            else{
                return false;
            }
        }
        return bytes(userList[key].username).length > 0;
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

    receive() external payable {}
}