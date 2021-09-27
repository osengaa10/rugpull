//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract FomoOE {

    uint public startTime;
    uint public totalTime;
    uint public timeLeft;
    address winning;
    uint public balanceReceived;
    // uint public keyPrice = 100 wei;
    // // Uncomment when testing is complete
    uint public keyPrice = 3366666666666 wei;
    // // Uncomment when testing is complete
    uint public totalKeys;
    uint public divPool;
    uint public jackpot;

    struct Divvies {
        uint _keyBalance;
        uint _divBalance;
        uint _withdrawnAmount;
    }

    mapping(address => Divvies) public divTracker;
    event keysPurchased(uint _userKeyBalance, uint _totalKeys, uint _keyPrice, uint _divPool, uint _jackpot, address _winning);
    event userDivvies(uint _userDivvies);
    event contractBalance(uint _balanceReceived);
    event currentKeyPrice(uint keyPrice);
    
    // function restartGame() public {
    //     require(getTimeLeft() == 0, "game is still in play");
    //     require(msg.sender == winning, "you are not the winner");
    //     letTheGamesBegin();
    // }
    function letTheGamesBegin() private {
        // // Uncomment when testing is complete
        // totalTime = block.timestamp + 86400;
        // // Uncomment when testing is complete
        totalTime = block.timestamp + 60;
    }
    function getTimeLeft() public view returns(uint) {
        if (totalKeys == 0) {
            return 86400;
        }
        if (totalTime >= block.timestamp) {
            return totalTime - block.timestamp;
        } else {
            return 0;
        }
    }
    function purchaseKeys(uint _amount) public payable {
        require(msg.value == keyPrice*_amount, "not enough to buy the key(s).");
        if (totalKeys == 0) {
            letTheGamesBegin();
        }
        require(getTimeLeft() > 0, "there is already a winner");
        uint floor = msg.value/2;
        jackpot += floor;
        divPool += msg.value - floor; 
        divTracker[msg.sender]._keyBalance += _amount;
        totalKeys += _amount;
        if (_amount*30 > 86400 - (totalTime-block.timestamp)) {
            // totalTime = 86400 + block.timestamp;
            letTheGamesBegin();
        } else {
            totalTime += _amount*30;
        }
        // // Uncomment when testing is complete
        uint numerator = keyPrice*100;
        keyPrice = keyPrice + numerator/10000;
        // // Uncomment when testing is complete

        // keyPrice = keyPrice + 400;
        winning = msg.sender;
        emit keysPurchased(divTracker[msg.sender]._keyBalance, totalKeys, keyPrice, divPool, jackpot, winning);   
    } 
    function getWinner() public view returns(address) {
        return winning;
    }
    
    function updateDivvies(address _userAddress) public view returns(uint) {
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
    
    function withdrawDivvies() public {
        address payable to = payable(msg.sender);
        uint tempUserWithdrawAmount;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserWithdrawAmount = 0;
        } else {
            // example to reference, but solidity can't do decimals
            // // tempUserKeyProportion = divTracker[_userAddress]._keyBalance/totalKeys;
            // // tempUserWithdrawAmount = tempUserKeyProportion*divPool - divTracker[_userAddress]._withdrawnAmount;

            tempNumerator = divTracker[msg.sender]._keyBalance * divPool;
            tempUserWithdrawAmount = tempNumerator/totalKeys - divTracker[msg.sender]._withdrawnAmount;
            divTracker[msg.sender]._withdrawnAmount += tempUserWithdrawAmount;
        }  
        require(tempUserWithdrawAmount > 0, "You have no divvies to claim");
        to.transfer(tempUserWithdrawAmount);
    }

    function jackpotPayout() public {
        require(getTimeLeft() == 0, "game is still in play");
        require(jackpot > 0, "No money in jackpot");
        require(msg.sender == winning, "you are not the winner");
        address payable to = payable(winning);
        to.transfer(jackpot);
        jackpot = 0;
    }

    function whoWon(address _userAddress) public view returns(address winner){
        if (getTimeLeft() == 0 && _userAddress == winning) {
            winner = _userAddress;
            return winner;
        }
    }

}



