//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract FomoOE {
    uint public startTime;
    uint public totalTime;
    uint public timeLeft;
    address owner;
    address winner;
    uint public balanceReceived;
    uint public keyPrice = 100 wei;
    uint public totalKeys;
    uint public divPool;
    uint public jackpot;

    struct Divvies {
        uint _keyBalance;
        uint _totalDivPoolAtWithdraw;
        uint _divBalance;
        uint _withdrawnAmount;
    }

    mapping(address => Divvies) public divTracker;
    event keysPurchased(uint _userKeyBalance, uint _totalKeys, uint _keyPrice, uint _divPool, uint _jackpot, address _winner);
    event userDivvies(uint _userDivvies);
    event contractBalance(uint _balanceReceived);
    event currentKeyPrice(uint keyPrice);
    
    constructor() {
        owner = msg.sender;
        
    }
    function letTheGamesBegin() private {
        totalTime = block.timestamp + 86400;
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
    function getTimeLeft() public view returns(uint) {
        if (totalKeys == 0) {
            return 86400;
        }
        return totalTime - block.timestamp;
    }

    function purchaseKeys(uint _amount) public payable {
        require(msg.value == keyPrice*_amount, "not enough to buy the key(s).");
        if (totalKeys == 0) {
            letTheGamesBegin();
        }
        // keyBalance[msg.sender] += _amount;
        // TODO: ADDRESS ROUNDING ISSUE
        divPool += msg.value/2;
        jackpot += msg.value/2;
        divTracker[msg.sender]._keyBalance += _amount;
        totalKeys += _amount;
        if (_amount*30 > 86400 - (totalTime-block.timestamp)) {
            // totalTime = 86400 + block.timestamp;
            letTheGamesBegin();
        } else {
            totalTime += _amount*30;
        }
        // // FIX THIS: update a user's withdrawable divvies after they purchase keys
        // uint userDivPool = divPool - divTracker[msg.sender]._totalDivPoolAtWithdraw;
        // uint numerator = divTracker[msg.sender]._keyBalance * userDivPool;
        // divTracker[msg.sender]._divBalance = numerator/totalKeys;
        // // FIX THIS: update a user's withdrawable divvies after they purchase keys
        keyPrice = keyPrice + 400;
        winner = msg.sender;
        emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot, winner);   
    } 
    function getWinner() public view returns(address) {
        return winner;
    }
    function updateDivvies(address _userAddress) public view returns(uint) {
        uint tempUserDivBalance;
        uint tempUserDivPool;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserDivBalance = 0;
        } else {
            // the pool a user's dividend is entitled to since last dividend withdraw.
            tempUserDivPool = divPool - divTracker[_userAddress]._totalDivPoolAtWithdraw;
            tempNumerator = divTracker[_userAddress]._keyBalance * tempUserDivPool;
            tempUserDivBalance = tempNumerator/totalKeys;
            // can update a users div balance, but it'll cost gas
            // divTracker[msg.sender]._divBalance = _divBalance;
            // emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot);
            // emit userDivvies(_divBalance);
        }  
        return tempUserDivBalance;
    }

        // ============= FIXED =============== 
    function updateDivvies2(address _userAddress) public view returns(uint) {
        uint tempUserWithdrawAmount;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserWithdrawAmount = 0;
        } else {
            // example to reference, but solidity can't do decimals
            // // tempUserKeyProportion = divTracker[_userAddress]._keyBalance/totalKeys;
            // // tempUserWithdrawAmount = tempUserKeyProportion*divPool - divTracker[_userAddress]._withdrawnAmount;

            tempNumerator = divTracker[_userAddress]._keyBalance * divPool;
            tempUserWithdrawAmount = tempNumerator/totalKeys - divTracker[_userAddress]._withdrawnAmount;
            
        }  
        return tempUserWithdrawAmount;
    }
    // ============= FIXED =============== 

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

    function withdrawDivvies2() public {
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