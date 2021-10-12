//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

/**
 * @title A rugpull opportunity for anyone
*/
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
    uint public keyPrice = 3366666666666000 wei;
    uint public increased_order = 3366666666666000;
    uint public keyPriceIncreaseBlockNumber;
    uint public multiplier = 100;


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

    event keysPurchased(uint _amount, address _winning);
    event userDivvies(uint _userDivvies);
    event contractBalance(uint _balanceReceived);
    event currentKeyPrice(uint keyPrice);
    
    
    constructor() {
    /**
     * @notice developer address is used to withdraw 1% depending on the outcome
     * of the vote. developer address has NO more privileges than any other address.  
     */
    developer = msg.sender;
    }
    /**
     * @dev Only humans can play. No smart contracts can play. 
     */
    modifier isHuman() {
        address _addr = msg.sender;
        uint256 _codeLength;
        assembly {_codeLength := extcodesize(_addr)}
        require(_codeLength == 0, "sorry humans only");
        _;
    }
    // function restartGame() public {
    //     require(getTimeLeft() == 0, "game is still in play");
    //     require(msg.sender == winning, "you are not the winner");
    //     letTheGamesBegin();
    // }

    /**
     * @dev put 24 (or 86,400 seconds) hours on the clock to start the game
     */
    function letTheGamesBegin() private {
        totalTime = block.timestamp + 86400;
    }

    /**
     * @notice source of truth for the time keeping. 
     * Query this function to get the amount of seconds remaining in the game
     */
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
    /**
     * @dev holds a logic for key price increase, adding time per key,
     * updating player's key balance, allocating funds, and setting the current winning player.
     * @notice If multiple key purchases are made a the end of the game, 
     * the winner will be the address who gets included FIRST in the game ending block.
    */
    function purchaseKeys(uint _amount) public payable isHuman() {
        /// @notice Incase the game has a slow start (no players), the first 5 key purchases set the clock to 24 hours 
        if (totalKeys == 0 || keyPurchases < 5) {
            letTheGamesBegin();
        } 
        require(getTimeLeft() > 0, "there is already a winner");
        /** 
         * @dev Key price can only increase once per block. Without this if/else
         * statement, there could only be one key purchase per block.
        */
        if (msg.value >= keyPrice*_amount) {
            keyPriceIncreaseBlockNumber = block.number;
            /**
             * @notice Starting at 1% price hike per purchase, if next price increase adds a digit
             * then price hike slows by 0.1%. This tapering until the minimum 0.2% price increase is reached. 
             * This game should end well before reaching 0.2% increases. 
             * If it doesn't, you people took this way too seriously 
             * EXAMPLE: KeyPrice=10 results in 1% increases each time keys are bought. 
             * When KeyPrice=100, price will increase by 0.9%. When KeyPrice=1000, price increases by 0.8% and so on..
            */
            uint numerator = keyPrice*multiplier;
            keyPrice = keyPrice + numerator/10000;
                if (keyPrice/increased_order >= 10 && multiplier >= 20) {
                    increased_order = keyPrice;
                    multiplier = multiplier - 10;
                }
        } else {
            uint numerator = keyPrice*multiplier;
            uint tempKeyPrice = keyPrice - numerator/10000;
            require(msg.value >= tempKeyPrice*_amount && block.number <= keyPriceIncreaseBlockNumber+2, "Not enough to buy the key(s): Key price is increasing quickly. Try refreshing the page and quickly submitting key purchase again.");
        }
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
            letTheGamesBegin();
        } else {
            totalTime += _amount*30;
        }

        keyPurchases += 1;
        winning = msg.sender;
        emit keysPurchased(_amount, winning);
    } 
    /**
     * @dev return which address is currently winning.
    */
    function getWinner() public view returns(address) {
        return winning;
    }
    /**
     * @dev Tracks each player's dividends.
    */
    function updateDivvies(address _userAddress) public view returns(uint) {
        uint tempUserWithdrawAmount;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserWithdrawAmount = 0;
        } else {
            tempNumerator = divTracker[_userAddress]._keyBalance * divPool;
            tempUserWithdrawAmount = tempNumerator/totalKeys - divTracker[_userAddress]._withdrawnAmount;  
        }  
        return tempUserWithdrawAmount;
    }
    
    function withdrawDivvies() public isHuman() {
        address payable to = payable(msg.sender);
        uint tempUserWithdrawAmount;
        uint tempNumerator;
        if (totalKeys == 0 ) {
            tempUserWithdrawAmount = 0;
        } else {
            tempNumerator = divTracker[msg.sender]._keyBalance * divPool;
            tempUserWithdrawAmount = tempNumerator/totalKeys - divTracker[msg.sender]._withdrawnAmount;
            divTracker[msg.sender]._withdrawnAmount += tempUserWithdrawAmount;
        }  
        require(tempUserWithdrawAmount > 0, "You have no divvies to claim");
        to.transfer(tempUserWithdrawAmount);
    }

    function jackpotPayout() public isHuman() {
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

    function voteForOnePercent(bool _vote) public isHuman() {
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



