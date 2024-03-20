// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title 5BLOC
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract CardContract is ERC721URIStorage, Ownable {
    address payable public _owner;
    uint256 public tokenCounter;
    uint public _tokenID;

    struct CardInfo{
        bool sold;
        string tokenURI;
        uint price;
        uint discount;
        string title;
        string description;
    }

    mapping(uint => CardInfo) cards;
    uint256[] public cardsID;

    event Purchase(address owner, uint price, uint id, string uri);

    constructor() Ownable(msg.sender) ERC721("RailRoadCardReduc", "RRCR") {
        _owner = payable(msg.sender);
        tokenCounter = 0;
    }

    function CheckIfAdmin() public view returns (bool isAdmin) {
        console.log(msg.sender);
        console.log(_owner);

        if(msg.sender == _owner){
            return true;
        }else{
            return false;
        }
    }

    function mint(string memory _tokenURI, uint _price, uint _discount, string memory _title, string memory _description) public onlyOwner returns(bool) {
        require(CheckIfAdmin() == true, "You must be a owner");
        require(_discount == 10 || _discount == 25 || _discount == 50, "Wrong discount");
        tokenCounter = tokenCounter + 1;
        _tokenID = tokenCounter;
        
        CardInfo storage newCard = cards[_tokenID];
        newCard.tokenURI = _tokenURI;
        newCard.price = _price;
        newCard.discount = _discount;
        newCard.title = _title;
        newCard.description = _description;
        cardsID.push(_tokenID);

        _mint(address(this), _tokenID);
        _setTokenURI(_tokenID, _tokenURI);
        return true;
    }

    function getTokenId() public view returns(uint256){
        return _tokenID;
    }

    function getAllCards() public view returns(CardInfo[] memory){
        CardInfo[] memory allCards = new CardInfo[](tokenCounter + 1);

        for(uint i = 1; i<= tokenCounter; i++){
            allCards[i] = cards[i];
        }
      
        return allCards;
    }

    function getDiscount(uint256 tokenId) public view returns(uint256) {
        return cards[tokenId].discount;
    }

    function buy(uint _id) external payable {
        _validate(_id);
        _trade(_id);
        emit Purchase(msg.sender, cards[_id].price, _id, tokenURI(_id));
    }

    function _validate(uint _id) internal {
        require(ownerOf(_id) != address(0), "Wrong token ID.");
        require(!cards[_id].sold, "Already sold.");
        require(msg.value >= cards[_id].price, "Not enough money.");
    }

    function _trade(uint _id) internal {
        _transfer(address(this), msg.sender, _id);
        _owner.transfer(msg.value);
        cards[_id].sold = true;
    }
}

contract BLOCRailRoadLRQV {

    CardContract private cardContract;

    address payable owner;

    constructor (address MyTokenAdress) {
        owner = payable(msg.sender);
        cardContract = CardContract(MyTokenAdress);
    }

    struct Account{
        uint ticketTrain;
        uint ticketSubway;
        uint ticketBus;
    }

    mapping (address => uint) public ticketTrain;
    mapping (address => uint) public ticketSubway;
    mapping (address => uint) public ticketBus;

    function getSender() public view returns (address){
        return msg.sender;
    }

    function getTickets(uint typeTicket) public view returns (uint nombreTicket) {
        require(typeTicket == 1 ||typeTicket == 2 ||typeTicket == 3 ,"Wrong ticket type");
        if(typeTicket == 1){
            return ticketTrain[msg.sender];
        }else if(typeTicket == 2){
            return ticketSubway[msg.sender];
        }else if(typeTicket == 3){
            return ticketBus[msg.sender];
        }
    }

    function buyTickets(uint typeTicket) public payable {
        uint priceTicket;
        uint priceDiscount;
        uint256 tok = cardContract.getTokenId();
        console.log(tok);
        require(typeTicket == 1 ||typeTicket == 2 ||typeTicket == 3 ,"Wrong ticket type");
        if(typeTicket == 1){
            priceTicket = 1000 wei;
            if(tok != 0){
                priceDiscount = cardContract.getDiscount(tok) * priceTicket/100;
                console.log(priceDiscount);
                priceTicket = priceTicket - priceDiscount;
                console.log(priceTicket);
            }
            console.log(priceTicket);
            require(msg.value >= priceTicket, "Not enough balance");
            ticketTrain[msg.sender] += 1;
        }else if(typeTicket == 2){
            priceTicket = 2000 wei;
            if(tok != 0){
                priceDiscount = cardContract.getDiscount(tok) * priceTicket/100;
                console.log(priceDiscount);
                priceTicket = priceTicket - priceDiscount;
                console.log(priceTicket);
            }
            console.log(priceTicket);
            require(msg.value >= priceTicket, "Not enough balance");
            ticketSubway[msg.sender]+= 1;
        }else if(typeTicket == 3){
            priceTicket = 3000 wei;
            if(tok != 0){
                priceDiscount = cardContract.getDiscount(tok) * priceTicket/100;
                console.log(priceDiscount);
                priceTicket = priceTicket - priceDiscount;
                console.log(priceTicket);
            }
            console.log(priceTicket);
            require(msg.value >= priceTicket, "Not enough balance");
            ticketBus[msg.sender] += 1;
        }
    }

    function getAllTickets() public view returns(uint, uint, uint){
        return (ticketTrain[msg.sender], ticketSubway[msg.sender], ticketBus[msg.sender]);
    }
}