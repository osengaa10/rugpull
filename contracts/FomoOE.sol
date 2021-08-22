//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract FomoOE {
    address owner;
    uint public balanceReceived;
    uint public keyPrice = 100 wei;
    uint public totalKeys;
    uint public divPool;
    uint public jackpot;

    uint public foo;
    uint public bar;
    // mapping(address => uint) public keyBalance;

    struct Divvies {
        uint _keyBalance;
        uint _totalDivPoolAtWithdraw;
        uint _divBalance;
    }

    mapping(address => Divvies) public divTracker;
    event keysPurchased(uint _userKeyBalance, uint _totalKeys, uint _keyPrice, uint _divPool, uint _jackpot);
    event userDivvies(uint _userDivvies);
    event contractBalance(uint _balanceReceived);
    event currentKeyPrice(uint keyPrice);
    constructor() {
        owner = msg.sender;
        foo = 1;
        bar = 2;
    }

    function receiveMoney() public payable {
        balanceReceived += msg.value;
        emit contractBalance(address(this).balance);
    }
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    function withdrawMoney() public {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
        emit contractBalance(address(this).balance);
    }
    function withdrawMoneyTo(address payable _to) public {
        _to.transfer(getBalance());
    }

    function purchaseKeys(uint _amount) public payable {
        require(msg.value == keyPrice*_amount, "not enough to buy the key(s).");
        // keyBalance[msg.sender] += _amount;
        // TODO: ADDRESS ROUNDING ISSUE
        divPool += msg.value/2;
        jackpot += msg.value/2;
        divTracker[msg.sender]._keyBalance += _amount;
        totalKeys += _amount;
        // FIX THIS: update a user's withdrawable divvies after they purchase keys
        uint userDivPool = divPool - divTracker[msg.sender]._totalDivPoolAtWithdraw;
        uint numerator = divTracker[msg.sender]._keyBalance * userDivPool;
        divTracker[msg.sender]._divBalance = numerator/totalKeys;
        // FIX THIS: update a user's withdrawable divvies after they purchase keys
        keyPrice = keyPrice + 400;
        emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot);   
    } 
    function getTotalKeyBalance() public view returns(uint) {
        return totalKeys;
    }
    function getUserKeyBalance() public view returns(uint) {
        return divTracker[msg.sender]._keyBalance;
    }

    function getKeyPrice() public view returns(uint) {
        return keyPrice;
    }


    // function updateDivvies(address _userAddress) public view returns(uint) {
    //     uint tempUserDivBalance;
    //     uint tempUserDivPool;
    //     uint tempNumerator;
    //     if (totalKeys == 0 ) {
    //         tempUserDivBalance = 0;
    //     } else {
    //         // the pool a user's dividend is entitled to since last dividend withdraw.
    //         tempUserDivPool = divPool - divTracker[_userAddress]._totalDivPoolAtWithdraw;
    //         tempNumerator = divTracker[_userAddress]._keyBalance * tempUserDivPool;
    //         tempUserDivBalance = tempNumerator/totalKeys;
    //         // can update a users div balance, but it'll cost gas
    //         // divTracker[msg.sender]._divBalance = _divBalance;
    //         // emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot);
    //         // emit userDivvies(_divBalance);
    //     }
        
    //     return divTracker[_userAddress]._keyBalance;

    //     // return foo + bar;
    // }
    function updateDivvies() public view returns(uint) {
        uint tempUserDivBalance;
        uint tempUserDivPool;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserDivBalance = 0;
        } else {
            // the pool a user's dividend is entitled to since last dividend withdraw.
            tempUserDivPool = divPool - divTracker[msg.sender]._totalDivPoolAtWithdraw;
            tempNumerator = divTracker[msg.sender]._keyBalance * tempUserDivPool;
            tempUserDivBalance = tempNumerator/totalKeys;
            // // can update a users div balance, but it'll cost gas
            // divTracker[msg.sender]._divBalance = tempUserDivBalance;
            // // emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot);
            // // emit userDivvies(_divBalance);
        }
        
        return divTracker[msg.sender]._divBalance;

        // return foo + bar;
    }

    function withdrawDivvies() public {
        address payable to = payable(msg.sender);
        uint userDivPool = divPool - divTracker[msg.sender]._totalDivPoolAtWithdraw;
        uint numerator = divTracker[msg.sender]._keyBalance * userDivPool;
        uint _divBalance = numerator/totalKeys;
        divTracker[msg.sender]._divBalance = 0;
        divTracker[msg.sender]._totalDivPoolAtWithdraw = divPool;
        require(_divBalance > 0, "You have no divvies to claim");
        to.transfer(_divBalance);
    }

}