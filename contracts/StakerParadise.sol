// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//  __  __  _____        ______ _     ___ 
// |  \/  |/ _ \ \      / / ___| |   |_ _|
// | |\/| | | | \ \ /\ / / |  _| |    | | 
// | |  | | |_| |\ V  V /| |_| | |___ | | 
// |_|  |_|\___/  \_/\_/  \____|_____|___|
// ``````````````````````````````` investmentPool = IVP````````````````````````
contract StakerParadise is Ownable {
    // --------------------- Var --------------------

    mapping(uint256 => IVP) private idToIVP;
    mapping(address => mapping(uint256 => uint256)) public userBalanceInPool;
    mapping(address => uint256) public userRewards;

    uint256 private IVPids = 1;
    IERC20 public SPT;

    struct IVP {
        uint256 id;
        address tokenAddress; //
        uint256 maxSupply; // max total can be staked in this pool
        uint256 depositTime; // how much days after creation
        uint256 minDeposit;
        uint256 amountOfTokenReward;
        uint256 currentBalance;
        uint256 stakeTime; // in days
        address[] stakers;
        uint256 createdAt;
    }

    // --------------------------- Events ------------------------

    event PoolCreated(uint256 indexed poolId, uint256 indexed createdAt);
    event NewStaker(uint256 indexed poolId, address indexed userAddress);
    event Unstaked(uint256 indexed poolId, address indexed userAddress);
    event Claimed(address indexed user);

    constructor(address spt_token_address) {
        SPT = IERC20(spt_token_address);
    }

    //                                  Main Functions

    // create an investment pool only owner can do it
    function createInvestmentPool(
        address _tokenAddress,
        uint256 _maxSupply,
        uint256 _depositTime,
        uint256 _minDeposit,
        uint256 _amountOfTokenReward,
        uint256 _stakeTime
    ) external onlyOwner {
        uint256 currentId = IVPids;
        IVPids += 1; // increment ids
        // fill the pool
        idToIVP[currentId].id = currentId;
        idToIVP[currentId].tokenAddress = _tokenAddress;
        idToIVP[currentId].maxSupply = _maxSupply;
        idToIVP[currentId].depositTime = _depositTime;
        idToIVP[currentId].minDeposit = _minDeposit;
        idToIVP[currentId].amountOfTokenReward = _amountOfTokenReward;
        idToIVP[currentId].stakeTime = _stakeTime;
        idToIVP[currentId].createdAt = block.timestamp;
        SPT.transferFrom(
            msg.sender,
            address(this),
            _amountOfTokenReward * 10**18
        );
        emit PoolCreated(currentId, block.timestamp);
    }

    // user can stake the token allowed on the pool

    function stake(uint256 _IVPid, uint256 _amount) external {
        IVP memory ivp = idToIVP[_IVPid];

        require(
            IERC20(ivp.tokenAddress).balanceOf(msg.sender) >= _amount * 10**18,
            "not enough"
        ); // user must hold the amount he wanna stake it
        require(_amount >= ivp.minDeposit, "mini entry"); // user should respect the mini entry amount
        require((_amount + ivp.currentBalance) <= ivp.maxSupply, "over amount"); // user should respect the max amount of the pool

        
        require(
            ivp.createdAt + ivp.depositTime * 1 days >= block.timestamp,
            "too late"
        ); // user should respect the deposit time

        // check if user if already staker
        if (isUserStaker(msg.sender, _IVPid) == false) {
            idToIVP[_IVPid].stakers.push(msg.sender);
        }
        idToIVP[_IVPid].currentBalance += _amount;
        userBalanceInPool[msg.sender][_IVPid] += _amount;

        IERC20(ivp.tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount * 10**18
        );
        emit NewStaker(_IVPid, msg.sender);
    }

    function unstake(uint256 _IVPid) external {
        IVP memory ivp = idToIVP[_IVPid];

        require(
            (ivp.createdAt +
                ivp.depositTime *
                1 days +
                ivp.stakeTime *
                1 days) <= block.timestamp,
            "not yet"
        );
        uint256 user_amount_invested = userBalanceInPool[msg.sender][_IVPid];
        userBalanceInPool[msg.sender][_IVPid] = 0;

        userRewards[msg.sender] +=
            (user_amount_invested / idToIVP[_IVPid].currentBalance) *
            100; // calculte user reward
        IERC20(ivp.tokenAddress).transfer(
            msg.sender,
            user_amount_invested * 10**18
        );
        emit Unstaked(_IVPid, msg.sender);
    }

    function claimReward() external {
        uint256 userReward = userRewards[msg.sender];
        userRewards[msg.sender] = 0;
        SPT.transfer(msg.sender, userReward * 10**18);
        emit Claimed(msg.sender);
    }

    //                              Helpful Functions

    // this function return true if the user is already investor in a pool
    // return false if not
    function isUserStaker(address _user, uint256 _IVPid)
        public
        view
        returns (bool)
    {
        IVP memory ivp = idToIVP[_IVPid];
        for (uint256 index = 0; index < ivp.stakers.length; index++) {
            if (ivp.stakers[index] == _user) {
                return true;
            }
        }
        return false;
    }

    // get the current Count of ids

    function getCurrentId() external view returns (uint256) {
        return IVPids;
    }

    // get the details of an IVP

    function getIVPdetails(uint256 _IVPid) external view returns (IVP memory) {
        return idToIVP[_IVPid];
    }

    // get all the live IVP

    function getLiveIVP() external view returns (IVP[] memory) {
        uint256 currentIndex = 0;
        uint256 totalLive = 0;

        for (uint256 i = 1; i < IVPids; i++) {
            if (
                block.timestamp <
                idToIVP[i].createdAt + idToIVP[i].depositTime * 1 days
            ) {
                totalLive += 1;
            }
        }

        IVP[] memory ivps = new IVP[](totalLive);
        for (uint256 i = 1; i < IVPids; i++) {
            if (
                block.timestamp <
                idToIVP[i].createdAt + idToIVP[i].depositTime * 1 days
            ) {
                IVP storage current_ivp = idToIVP[i];
                ivps[currentIndex] = current_ivp;
                currentIndex++;
            }
        }
        
        return ivps;
    }

    // get all the end IVP
    function getEndIVP() external view returns (IVP[] memory) {
        uint256 currentIndex = 0;
        uint256 totalLive = 0;

        for (uint256 i = 1; i < IVPids; i++) {
            if (
                block.timestamp >
                idToIVP[i].createdAt + idToIVP[i].depositTime * 1 days
            ) {
                totalLive += 1;
            }
        }

        IVP[] memory ivps = new IVP[](totalLive);
        for (uint256 i = 1; i < IVPids; i++) {
            if (
                block.timestamp >
                idToIVP[i].createdAt + idToIVP[i].depositTime * 1 days
            ) {
                IVP storage current_ivp = idToIVP[i];
                ivps[currentIndex] = current_ivp;
                currentIndex++;
            }
        }
        return ivps;
    }

    // get all the user IVP

    function getUserInvestment(address _user)
        external
        view
        returns (IVP[] memory)
    {
        uint256 currentIndex = 0;
        uint256 userPools = 0;

        for (uint256 i = 1; i < IVPids; i++) {
            if (isUserStaker(_user, i) == true) {
                userPools += 1;
            }
        }

        IVP[] memory ivps = new IVP[](userPools);
        for (uint256 i = 1; i < IVPids; i++) {
            if (isUserStaker(_user, i) == true) {
                IVP storage current_ivp = idToIVP[i];
                ivps[currentIndex] = current_ivp;
                currentIndex++;
            }
        }
        return ivps;
    }
}
