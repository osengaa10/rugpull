//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract FomoOE {
    address developer;
    uint public developerOnePercent;
    uint public giveToDeveloper;
    uint public giveToJackpot;
    uint public startTime;
    uint public totalTime;
    uint public timeLeft;
    address winning;
    uint public balanceReceived;
    // uint public keyPrice = 100 wei;
    // // Uncomment when testing is complete
    uint public keyPrice = 3366666666666000 wei;
    // uint public keyPrice = 0.01 ether;

    // // Uncomment when testing is complete
    uint public totalKeys;
    uint public keyPurchases;
    uint public divPool;
    uint public jackpot;

    struct Divvies {
        uint _keyBalance;
        uint _divBalance;
        uint _withdrawnAmount;
        bool _voted;
        bool _boughtKeys;
    }

    mapping(address => Divvies) public divTracker;
    event keysPurchased(uint _userKeyBalance, uint _totalKeys, uint _keyPrice, uint _divPool, uint _jackpot, address _winning);
    event userDivvies(uint _userDivvies);
    event contractBalance(uint _balanceReceived);
    event currentKeyPrice(uint keyPrice);
    

    constructor() {
        developer = msg.sender;
    }
    // function restartGame() public {
    //     require(getTimeLeft() == 0, "game is still in play");
    //     require(msg.sender == winning, "you are not the winner");
    //     letTheGamesBegin();
    // }
    function letTheGamesBegin() private {
        // Uncomment when testing is complete
        totalTime = block.timestamp + 86400;
        // Uncomment when testing is complete
        // totalTime = block.timestamp + 60;
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
        require(msg.value >= keyPrice*_amount, "not enough to buy the key(s).");
        if (totalKeys == 0) {
            letTheGamesBegin();
        }
        require(getTimeLeft() > 0, "there is already a winner");
        uint devShareNumerator = msg.value*100;
        uint devShare = devShareNumerator/10000;
        uint gameShare = msg.value - devShare;
        uint floor = gameShare/2;
        developerOnePercent += devShare;
        jackpot += floor;
        divPool += gameShare - floor; 
        divTracker[msg.sender]._keyBalance += _amount;
        divTracker[msg.sender]._boughtKeys = true;
        totalKeys += _amount;
        if (_amount*30 > 86400 - (totalTime-block.timestamp)) {
            // totalTime = 86400 + block.timestamp;
            letTheGamesBegin();
        } else {
            totalTime += _amount*30;
        }
        // // Uncomment when testing is complete
        if (keyPurchases > 500) {
            uint numerator = keyPrice*100;
            keyPrice = keyPrice + numerator/10000;
        } else {
            uint numerator = keyPrice*50;
            keyPrice = keyPrice + numerator/10000;
        }
        // // Uncomment when testing is complete
        keyPurchases += 1;

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

    function developerOnePercentAllocation() public {
        require(msg.sender == developer, "you aren't the developer of this contract.");
        require(getTimeLeft() == 0, "game is still in play");
        if (giveToDeveloper >= giveToJackpot) {
            address payable to = payable(developer);
            to.transfer(developerOnePercent);
            
        } else {
            address payable to = payable(winning);
            to.transfer(developerOnePercent);
        }
        developerOnePercent = 0;
    }

    function voteForOnePercent(bool _vote) public {
        require(divTracker[msg.sender]._boughtKeys == true, "you need to buy at least one key to vote.");
        require(divTracker[msg.sender]._voted == false, "you already voted.");
        divTracker[msg.sender]._voted = true;
        if (_vote == true) {
            giveToDeveloper += 1;
        } else {
            giveToJackpot += 1;
        }
    }

}



