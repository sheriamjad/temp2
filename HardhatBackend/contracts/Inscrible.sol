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
        return bytes(userList[key].username).length > 0;
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