import React, { Component } from "react";
import {
	Backdrop,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	Tooltip,
} from "@mui/material";
import Web3 from "web3";
import {
	CheckCircleOutline,
	Info,
	ListAlt,
	Palette,
	Security,
	Sell,
	Store,
	Style,
	Image,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import HeaderLink from "../hooks/HeaderLink";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import FileUpload from "../hooks/FileUpload";
// const metamaskProvider = window.ethereum;
// const web3 = new Web3("http://127.0.0.1:7545");

const metamaskProvider = window.ethereum;
const web3 = new Web3(metamaskProvider);
const metamaskAccount = "";

const contractTicketsABI = [
	{
		inputs: [
			{ internalType: "address", name: "MyTokenAdress", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [{ internalType: "uint256", name: "typeTicket", type: "uint256" }],
		name: "buyTickets",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllTickets",
		outputs: [
			{ internalType: "uint256", name: "", type: "uint256" },
			{ internalType: "uint256", name: "", type: "uint256" },
			{ internalType: "uint256", name: "", type: "uint256" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getSender",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "typeTicket", type: "uint256" }],
		name: "getTickets",
		outputs: [
			{ internalType: "uint256", name: "nombreTicket", type: "uint256" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "ticketBus",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "ticketSubway",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "ticketTrain",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
];
const contractCardABI = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{ indexed: false, internalType: "bool", name: "approved", type: "bool" },
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{ indexed: false, internalType: "uint256", name: "id", type: "uint256" },
			{ indexed: false, internalType: "string", name: "uri", type: "string" },
		],
		name: "Purchase",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [],
		name: "CheckIfAdmin",
		outputs: [{ internalType: "bool", name: "isAdmin", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_owner",
		outputs: [{ internalType: "address payable", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_tokenID",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
		name: "buy",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "cardsID",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllCards",
		outputs: [
			{
				components: [
					{ internalType: "bool", name: "sold", type: "bool" },
					{ internalType: "string", name: "tokenURI", type: "string" },
					{ internalType: "uint256", name: "price", type: "uint256" },
					{ internalType: "uint256", name: "discount", type: "uint256" },
					{ internalType: "string", name: "title", type: "string" },
					{ internalType: "string", name: "description", type: "string" },
				],
				internalType: "struct CardContract.CardInfo[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getApproved",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "getDiscount",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getTokenId",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "operator", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "string", name: "_tokenURI", type: "string" },
			{ internalType: "uint256", name: "_price", type: "uint256" },
			{ internalType: "uint256", name: "_discount", type: "uint256" },
			{ internalType: "string", name: "_title", type: "string" },
			{ internalType: "string", name: "_description", type: "string" },
		],
		name: "mint",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "data", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "operator", type: "address" },
			{ internalType: "bool", name: "approved", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "tokenCounter",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

const ContractTickets = new web3.eth.Contract(
	contractTicketsABI, // import the contracts's ABI and use it here
	"0x1Cc6B8945a9970B88382f67391C9a7ed1eCF4411",
	{
		gasPrice: "20000000000",
		gasLimit: 1000000,
	}
);

const ContractCards = new web3.eth.Contract(
	contractCardABI, // import the contracts's ABI and use it here
	"0x9eF7cDC80d56769D0428E5dAA17C6252ce203406",
	{
		gasPrice: "20000000000",
		gasLimit: 1000000,
	}
);

const Toast = Swal.mixin({
	toast: true,
	position: "bottom-end",
	showConfirmButton: false,
	timer: 5000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayMainContent: false,
			connected: false,
			admin: false,
			account: "",
			hideConnexion: false,
			numberTicketsBus: 0,
			numberTicketsTrain: 0,
			numberTicketsMetro: 0,
			cardsToDisplay: [],
			myCards: [],
			discountApplied: 0,
			discountIDApplied: null,
			detailCard: {},
			loadingCards: true,
			showBackdrop: false,
			cardToTransfer: {},
			addressValue: "",
		};
	}

	componentDidMount() {
		metamaskProvider.on("accountsChanged", function () {
			window.location.replace("/Home");
		});

		let td = new URLSearchParams(window.location.search).get("td");
		if (td !== null) {
			this.setState({ hideConnexion: true });
		}
		let self = this;
		web3.eth.requestAccounts().then((accounts) => {
			if (accounts && accounts.length > 0) {
				web3.eth.getBalance(accounts[0], function (err, result) {
					let balance = web3.utils.fromWei(result, "ether");
					if (balance > 0) {
						self.setState(
							{
								connected: true,
								displayMainContent: true,
								account: accounts[0],
							},
							() => {
								ContractCards.methods
									.CheckIfAdmin()
									.call({ from: accounts[0], gasPrice: "20000000000" })
									.then((result) => {
										self.setState({ admin: result });
									});
								ContractTickets.methods
									.getAllTickets()
									.call({ from: accounts[0], gasPrice: "20000000000" })
									.then((result) => {
										self.setState({
											numberTicketsBus: result[2],
											numberTicketsTrain: result[0],
											numberTicketsMetro: result[1],
										});
									});
								ContractCards.methods
									.getAllCards()
									.call({ from: accounts[0], gasPrice: "20000000000" })
									.then((result) => {
										let cardsToDisplay = [],
											myCards = [];
										result.forEach((card, index) => {
											if (index !== 0) {
												ContractCards.methods
													.ownerOf(index)
													.call({ from: accounts[0], gasPrice: "20000000000" })
													.then((ownerOfCard) => {
														let cardTemp = JSON.parse(JSON.stringify(card));
														let cardEntity = {
															id: index,
															sold: cardTemp[0],
															tokenURI: cardTemp[1],
															price: cardTemp[2],
															discount: cardTemp[3],
															title: cardTemp[4],
															description: cardTemp[5],
															activeCard: null,
														};
														if (
															ownerOfCard ===
															"0x8f6576440Ae1E41DedC0D4cac374f2e583D90aC3"
														) {
															// if the card is not sold (contract address)
															cardsToDisplay.push(cardEntity);
														} else if (ownerOfCard === accounts[0]) {
															// if the card is sold and the user is the owner
															if (
																parseInt(cardEntity.discount) >
																	self.state.discountApplied ||
																0
															) {
																self.setState({
																	discountApplied: cardEntity.discount,
																	discountIDApplied: cardEntity.id,
																});
															}
															myCards.push(cardEntity);
														}
														if (index === result.length - 1) {
															self.setState({
																cardsToDisplay,
																myCards,
																loadingCards: false,
															});
														}
													});
											}
										});
									});
							}
						);
						setTimeout(() => {
							self.setState({ hideConnexion: true });
						}, 2000);
						if (td !== "true") {
							Toast.fire({
								icon: "success",
								title: "Connexion réussie",
							});
						}
					} else {
						Swal.fire({
							title: "Fonds insuffisants !",
							text: "Vous n'avez pas assez de fonds sur votre compte pour utiliser l'application",
							icon: "error",
							target: "#connexionWall",
							confirmButtonText: "Ok",
						});
					}
				});
			} else {
				Swal.fire({
					title: "Erreur !",
					text: "Lien impossible entre votre portefeuille et l'application",
					icon: "error",
					target: "#connexionWall",
					confirmButtonText: "Ok",
				});
				console.log("user not connected");
			}
		});
		// window.web3.eth.change(() => {
		//     // Do something
		// });
	}

	buyTickets(type) {
		this.setState({ showBackdrop: true });
		let self = this;
		ContractTickets.methods
			.buyTickets(type)
			.send({
				from: this.state.account,
				value: type * 1000 - (self.state.discountApplied * (type * 1000)) / 100,
				gasPrice: "20000000000",
			})
			.then((result) => {
				switch (type) {
					case 1:
						self.setState({
							numberTicketsTrain: parseInt(self.state.numberTicketsTrain) + 1,
						});
						break;
					case 2:
						self.setState({
							numberTicketsMetro: parseInt(self.state.numberTicketsMetro) + 1,
						});
						break;
					case 3:
						self.setState({
							numberTicketsBus: parseInt(self.state.numberTicketsBus) + 1,
						});
						break;
					default:
						break;
				}
				Toast.fire({
					icon: "success",
					title: "Ticket acheté !",
				});
				this.setState({ showBackdrop: false });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	buyCard(cardToBuy) {
		this.setState({ showBackdrop: true });
		let self = this;
		ContractCards.methods
			.buy(cardToBuy.id)
			.send({
				from: this.state.account,
				value: parseInt(cardToBuy.price),
				gasPrice: "20000000000",
			})
			.then((result) => {
				console.log(result);
				if (result.status) {
					let cardsToDisplay = self.state.cardsToDisplay;
					let myCards = self.state.myCards;
					let index = cardsToDisplay.findIndex(
						(card) => card.id === cardToBuy.id
					);
					if (index !== -1) {
						cardsToDisplay.splice(index, 1);
						myCards.push(cardToBuy);
					}
					self.setState({ cardsToDisplay, myCards, showBackdrop: false });
				}
			});
	}

	goToPage(clickedPage) {
		window.history.replaceState(null, null, window.location.pathname);
		window.location.pathname !== clickedPage
			? this.props.history.push(clickedPage)
			: window.location.reload();
		this.setState({ displayMenuMobile: false });
	}

	handleChange(event) {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
	}

	render() {
		return (
			<div
				style={{
					height: "100vh",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#FFFFFF",
					overflow: "hidden",
					flexDirection: "column",
				}}>
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={this.state.showBackdrop}>
					<div className={"flexCenter"} style={{ flexDirection: "column" }}>
						<CircularProgress color="inherit" />
						<h2 className={"loadingText"} style={{ fontWeight: 100 }}>
							Chargement en cours{" "}
						</h2>
					</div>
				</Backdrop>
				{/*=================HEADER===================*/}
				<div
					className={"flexCenter backgroundGradient"}
					style={{ width: "100%", height: 70 }}>
					<div
						onAuxClick={(e) => {
							if (e.button === 1) {
								window.open("/BtoBDesign/Accueil", "_blank");
							}
						}}
						onClick={() => {
							this.goToPage("/BtoBDesign/Accueil");
						}}
						style={{
							display: "flex",
							cursor: "pointer",
							justifyContent: "center",
							alignItems: "center",
							width: "fit-content",
						}}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: 0,
								userSelect: "none",
								marginLeft: 20,
								width: "fit-content",
							}}>
							<img
								style={{ width: 245, marginRight: 15 }}
								className={"gradientLogo"}
								src={require("../assets/trainLogoColor2.png")}
								alt="NAVI CHAIN LOGO"
							/>
						</div>
					</div>
					<div style={{ display: "flex", width: "100%" }}>
						<>
							<div
								style={{
									display: "flex",
									width: "90%",
									justifyContent: "space-evenly",
									alignItems: "center",
									marginLeft: 0,
									marginRight: 20,
								}}>
								{/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/MesConcepts', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/MesConcepts")}} className={"menuNC flexCenter"}><Style style={{marginRight:5}}/>Acheter un ticket</div>*/}
								{/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/Catalogue', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/Catalogue")}} className={"menuNC flexCenter"}><Sell style={{marginRight:5}}/>Acheter une carte</div>*/}
								{/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/Catalogue', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/Catalogue")}} className={"menuNC flexCenter"}><ListAlt style={{marginRight:5}}/>Liste des transactions</div>*/}
								{this.state.admin && (
									<>
										<HeaderLink target={"Home"} />
										<HeaderLink target={"AdminCards"} />
									</>
								)}
							</div>
						</>
					</div>
				</div>
				{/*=================FIN=HEADER===============*/}
				{/*=================CONNEXION================*/}
				{!this.state.hideConnexion && (
					<div
						id={"connexionWall"}
						className={"backgroundGradient"}
						style={{
							position: "absolute",
							zIndex: 9999,
							flexDirection: "column",
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							transition: "all 1.5s cubic-bezier(.25,.8,.25,1)",
							animation: "all 1.5s cubic-bezier(.25,.8,.25,1)",
							transform: this.state.displayMainContent && "translateY(-100vh)",
						}}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: 15,
								userSelect: "none",
							}}>
							<img
								style={{ width: 500, marginRight: 15 }}
								className={"gradientLogo"}
								src={require("../assets/trainLogoColor2.png")}
								alt="NAVI CHAIN LOGO"
							/>
						</div>
						{this.state.connected ? (
							<>
								<h2
									style={{ color: "#000", fontWeight: 300, marginBottom: 10 }}
									className={"flexCenter"}>
									Connecté en tant qu'
									{this.state.admin ? "administrateur" : "utilisateur"}
								</h2>
								<h2
									style={{
										color: "#000",
										fontWeight: 300,
										marginTop: 5,
										fontSize: 18,
										fontStyle: "italic",
									}}
									className={"flexCenter"}>
									Bienvenue !
								</h2>
								<CheckCircleOutline
									style={{ width: 50, height: 50, color: "#FFF", marginTop: 5 }}
								/>
							</>
						) : (
							<h2
								style={{
									color: "#000",
									fontWeight: 300,
									marginTop: 36,
									marginBottom: 70,
								}}
								className={"flexCenter"}>
								Veuillez connecter votre wallet pour utiliser ce site web !
							</h2>
						)}
					</div>
				)}
				{/*=============FIN=CONNEXION================*/}
				{this.state.displayMainContent && (
					<div
						className={"backgroundGradientLight"}
						style={{
							flexDirection: "column",
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							overflow: "auto",
							transition: "all 1.5s cubic-bezier(.25,.8,.25,1)",
							animation: "all 1.5s cubic-bezier(.25,.8,.25,1)",
						}}>
						<Dialog
							open={Object.keys(this.state.detailCard).length > 0}
							onClose={() => {
								this.setState({ detailCard: {} });
							}}>
							<DialogTitle>
								<h2 style={{ marginTop: 0, marginBottom: 0 }}>
									Detail de la carte
								</h2>
							</DialogTitle>
							<DialogContent
								style={{ padding: 0, paddingLeft: 8, paddingRight: 8 }}>
								{Object.keys(this.state.detailCard).length > 0 && (
									<div
										style={{ flexDirection: "column" }}
										className={"flexCenter"}>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												height: 24,
												maxHeight: 24,
												overflow: "hidden",
												marginTop: 10,
											}}>
											Nom :{" "}
											<span style={{ fontWeight: 300 }}>
												{this.state.detailCard.title}
											</span>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												height: 24,
												maxHeight: 24,
												overflow: "hidden",
											}}>
											Image :{" "}
											<a
												href={this.state.detailCard.tokenURI}
												target={"_blank"}
												style={{ fontWeight: 300, margin: 0 }}>
												Lien
											</a>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
											}}>
											Description :{" "}
											<span style={{ fontWeight: 300 }}>
												{this.state.detailCard.description}
											</span>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
											}}>
											Réduction :
											<span style={{ marginRight: 5, fontWeight: 300 }}>
												{" "}
												{this.state.detailCard.discount}
											</span>
											%
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												marginBottom: 5,
											}}>
											Prix d'achat :
											<span style={{ marginRight: 5, fontWeight: 300 }}>
												{" "}
												{this.state.detailCard.price}
											</span>
											Wei
										</p>
									</div>
								)}
							</DialogContent>
						</Dialog>

						<Dialog
							open={Object.keys(this.state.cardToTransfer).length > 0}
							onClose={() => {
								this.setState({ cardToTransfer: {} });
							}}>
							<DialogTitle>
								<h2 style={{ marginTop: 0, marginBottom: 0 }}>
									Transférer votre carte
								</h2>
							</DialogTitle>
							<DialogContent
								style={{ padding: 0, paddingLeft: 8, paddingRight: 8 }}>
								{Object.keys(this.state.cardToTransfer).length > 0 && (
									<div
										style={{ flexDirection: "column" }}
										className={"flexCenter"}>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												height: 24,
												maxHeight: 24,
												overflow: "hidden",
												marginTop: 10,
											}}>
											Nom :{" "}
											<span style={{ fontWeight: 300 }}>
												{this.state.cardToTransfer.title}
											</span>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												height: 24,
												maxHeight: 24,
												overflow: "hidden",
											}}>
											Image :{" "}
											<a
												href={this.state.cardToTransfer.tokenURI}
												target={"_blank"}
												style={{ fontWeight: 300, margin: 0 }}>
												Lien
											</a>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
											}}>
											Description :{" "}
											<span style={{ fontWeight: 300 }}>
												{this.state.cardToTransfer.description}
											</span>
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
											}}>
											Réduction :
											<span style={{ marginRight: 5, fontWeight: 300 }}>
												{" "}
												{this.state.cardToTransfer.discount}
											</span>
											%
										</p>
										<p
											style={{
												fontSize: 18,
												fontWeight: 700,
												margin: 0,
												textAlign: "center",
												marginBottom: 5,
											}}>
											Prix d'achat :
											<span style={{ marginRight: 5, fontWeight: 300 }}>
												{" "}
												{this.state.cardToTransfer.price}
											</span>
											Wei
										</p>
										<br />
										<div
											style={{ flexDirection: "column" }}
											className={"flexCenter"}>
											<p style={{ margin: 0 }}>Adresse du destinataire : </p>
											<input
												className={"inputDiv"}
												placeholder={
													"0x9B1D553f92aB19778564C4962b0299289fF119Fa"
												}
												name={"addressValue"}
												onChange={(e) => {
													this.handleChange(e);
												}}
												type="text"
											/>
										</div>

										<button
											onClick={() => {
												console.log(this.state.addressValue);
												let self = this;
												this.setState({
													showBackdrop: true,
													cardToTransfer: {},
												});
												ContractCards.methods
													.transferFrom(
														this.state.account,
														this.state.addressValue,
														self.state.cardToTransfer.id
													)
													.send({
														from: this.state.account,
														gasPrice: "20000000000",
													})
													.then(() => {
														let newCards = this.state.myCards;
														newCards.splice(
															newCards.indexOf(self.state.cardToTransfer),
															1
														);
														self.setState({
															myCards: newCards,
															showBackdrop: false,
														});
														Toast.fire({
															icon: "success",
															title: "Carte transférée !",
														});
													});
											}}
											className={"divButton"}
											style={{ margin: 15 }}>
											Transférer
										</button>
									</div>
								)}
							</DialogContent>
						</Dialog>
						{/*=============Panel================*/}					
						{/*=============Fin Panel================*/}
						{/*=============Panel Bus================*/}					
						<div
							className={"divNCWhite"}
							id={"divTickets"}
							style={{ marginBottom: 8, justifyContent: "space-evenly" }}>
							<div
								className={"flexCenter"}
								style={{
									position: "relative",
									width: "100%",
									marginBottom: 20,
								}}>
								<h1
									style={{
										fontWeight: 300,
										fontSize: 25,
										fontFamily: "LEMONMILK",
										position: "absolute",
										top: 0,
									}}>
									Bus
								</h1>
							</div>
							<br></br>
							
							<div
								style={{
									display: "flex",
									justifyContent: "space-evenly",
									alignItems: "center",
									flexWrap: "wrap",
									height: "300px",
									margin: 15,
									width: "100%",
								}}>
									<img
									style={{
										height:290,
										width: 462,
										borderRadius:70
									}}
							src={require("../assets/carte_bus.jpg")} // Remplacez par le chemin de votre image
							alt="Image description" // Donnez une description alternative de l'image
							/>

								{/*=============Panel Bus================*/}
								<div
									style={{
										maxWidth: 400,
										minWidth: 290,
										width: "29%",
										justifyContent: "space-between",
										flexDirection: "row",
									}}
									className={"divItem flexCenter"}>
									<div
										className={"flexCenter"}
										style={{
											width: "75%",
											height: "100%",
											flexDirection: "column",
										}}>
										<h2
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											Ticket de bus
											<Tooltip
												title={
													"Ce ticket vous permet d'effectuer un trajet dans tous nos bus."
												}>
												<Info
													style={{
														color: "#888888",
														marginLeft: 5,
														marginTop: 4,
														transform: "scale(0.9)",
													}}
												/>
											</Tooltip>
										</h2>
										<div
											style={{ width: 160, height: 140, position: "relative" }}>
											<img
												className={"TicketImage"}
												src={require("../assets/logoTicketBus.png")}
												alt="ticket Bus"
											/>
										</div>
										<h3
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											<span
												style={{
													color: this.state.discountApplied !== 0 && "#17b700",
													marginRight: 3,
												}}>
												{3000 - (this.state.discountApplied * 3000) / 100}
											</span>
											Wei
											{this.state.discountApplied !== 0 && (
												<h3
													style={{
														color: "#17b700",
														fontWeight: 100,
														margin: 0,
														marginLeft: 5,
													}}>
													(-{this.state.discountApplied}%)
												</h3>
											)}
										</h3>
									</div>
									<div
										className={"flexCenter"}
										style={{
											flexDirection: "column",
											height: "100%",
											borderRadius: 5,
											width: 100,
											justifyContent: "space-evenly",
										}}>
										<button
											onClick={() => {
												this.buyTickets(3);
											}}
											className={"divButton"}
											style={{ width: "100%", height: "60%" }}>
											Acheter
										</button>
										<div
											className={"flexCenter"}
											style={{
												width: "100%",
												height: "40%",
												borderRadius: 5,
												boxShadow:
													" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
											}}>
											<p
												style={{
													fontSize: 22,
													fontWeight: 300,
													marginTop: 20,
												}}>
												{this.state.numberTicketsBus}
											</p>
										</div>
									</div>
								</div>
									{/*=============FinPanel Bus================*/}				
							</div>
						</div>
						{/*=============Fin Panel Bus================*/}
						{/*=============Panel Metro================*/}					
						<div
							className={"divNCWhite"}
							id={"divTickets"}
							style={{ marginBottom: 8, justifyContent: "space-evenly" }}>
							<div
								className={"flexCenter"}
								style={{
									position: "relative",
									width: "100%",
									marginBottom: 20,
								}}>
								<h1
									style={{
										fontWeight: 300,
										fontSize: 25,
										fontFamily: "LEMONMILK",
										position: "absolute",
										top: 0,
									}}>
									Metro
								</h1>
							</div>
							<br></br>
							
							<div
								style={{
									display: "flex",
									justifyContent: "space-evenly",
									alignItems: "center",
									flexWrap: "wrap",
									height: "300px",
									margin: 15,
									width: "100%",
								}}>
									<img
									style={{
										height:290,
										width: 462,
										borderRadius:70
									}}
							src={require("../assets/carte_metro.jpg")} // Remplacez par le chemin de votre image
							alt="Image description" // Donnez une description alternative de l'image
							/>		
							<div
									style={{
										maxWidth: 400,
										minWidth: 290,
										width: "29%",
										justifyContent: "space-between",
										flexDirection: "row",
									}}
									className={"divItem flexCenter"}>
									<div
										className={"flexCenter"}
										style={{
											width: "75%",
											height: "100%",
											flexDirection: "column",
										}}>
										<h2
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											Ticket de metro
											<Tooltip
												title={
													"Ce ticket vous permet d'effectuer un trajet dans tous nos metros."
												}>
												<Info
													style={{
														color: "#888888",
														marginLeft: 5,
														marginTop: 4,
														transform: "scale(0.9)",
													}}
												/>
											</Tooltip>
										</h2>
										<div
											style={{ width: 160, height: 140, position: "relative" }}>
											<img
												className={"TicketImage"}
												src={require("../assets/logoTicketMetro.png")}
												alt="ticket Metro"
											/>
										</div>
										<h3
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											<span
												style={{
													color: this.state.discountApplied !== 0 && "#17b700",
													marginRight: 3,
												}}>
												{2000 - (this.state.discountApplied * 2000) / 100}
											</span>
											Wei
											{this.state.discountApplied !== 0 && (
												<h3
													style={{
														color: "#17b700",
														fontWeight: 100,
														margin: 0,
														marginLeft: 5,
													}}>
													(-{this.state.discountApplied}%)
												</h3>
											)}
										</h3>
									</div>
									<div
										className={"flexCenter"}
										style={{
											flexDirection: "column",
											height: "100%",
											borderRadius: 5,
											width: 100,
											justifyContent: "space-evenly",
										}}>
										<button
											onClick={() => {
												this.buyTickets(2);
											}}
											className={"divButton"}
											style={{ width: "100%", height: "60%" }}>
											Acheter
										</button>
										<div
											className={"flexCenter"}
											style={{
												width: "100%",
												height: "40%",
												borderRadius: 5,
												boxShadow:
													" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
											}}>
											<p
												style={{
													fontSize: 22,
													fontWeight: 300,
													marginTop: 20,
												}}>
												{this.state.numberTicketsMetro}
											</p>
										</div>
									</div>
								</div>	
							</div>
								
						</div>
						{/*=============Fin Panel Metro================*/}
						{/*=============Panel Train================*/}					
						<div
							className={"divNCWhite"}
							id={"divTickets"}
							style={{ marginBottom: 8, justifyContent: "space-evenly" }}>
							<div
								className={"flexCenter"}
								style={{
									position: "relative",
									width: "100%",
									marginBottom: 20,
								}}>
								<h1
									style={{
										fontWeight: 300,
										fontSize: 25,
										fontFamily: "LEMONMILK",
										position: "absolute",
										top: 0,
									}}>
									Train
								</h1>
							</div>
							<br></br>
							
							<div
								style={{
									display: "flex",
									justifyContent: "space-evenly",
									alignItems: "center",
									flexWrap: "wrap",
									height: "300px",
									margin: 15,
									width: "100%",
								}}>
									<img
									style={{
										height:290,
										width: 462,
										padding: 25,
										borderRadius:70
									}}
							src={require("../assets/carte_train.jpg")} // Remplacez par le chemin de votre image
							alt="Image description" // Donnez une description alternative de l'image
							/>
							<div
									style={{
										maxWidth: 400,
										minWidth: 290,
										width: "29%",
										justifyContent: "space-between",
										flexDirection: "row",
									}}
									className={"divItem flexCenter"}>
									<div
										className={"flexCenter"}
										style={{
											width: "75%",
											height: "100%",
											flexDirection: "column",
										}}>
										<h2
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											Ticket de train
											<Tooltip
												title={
													"Ce ticket vous permet d'effectuer un trajet dans tous nos trains."
												}>
												<Info
													style={{
														color: "#888888",
														marginLeft: 5,
														marginTop: 4,
														transform: "scale(0.9)",
													}}
												/>
											</Tooltip>
										</h2>
										<div
											style={{ width: 160, height: 140, position: "relative" }}>
											<img
												className={"TicketImage"}
												src={require("../assets/logoTicketTrain.png")}
												alt="ticket Train"
											/>
										</div>
										<h3
											className={"flexCenter"}
											style={{ fontWeight: 100, margin: 0 }}>
											<span
												style={{
													color: this.state.discountApplied !== 0 && "#17b700",
													marginRight: 3,
												}}>
												{1000 - (this.state.discountApplied * 1000) / 100}
											</span>
											Wei
											{this.state.discountApplied !== 0 && (
												<h3
													style={{
														color: "#17b700",
														fontWeight: 100,
														margin: 0,
														marginLeft: 5,
													}}>
													(-{this.state.discountApplied}%)
												</h3>
											)}
										</h3>
									</div>
									<div
										className={"flexCenter"}
										style={{
											flexDirection: "column",
											height: "100%",
											borderRadius: 5,
											width: 100,
											justifyContent: "space-evenly",
										}}>
										<button
											onClick={() => {
												this.buyTickets(1);
											}}
											className={"divButton"}
											style={{ width: "100%", height: "60%" }}>
											Acheter
										</button>
										<div
											className={"flexCenter"}
											style={{
												width: "100%",
												height: "40%",
												borderRadius: 5,
												boxShadow:
													" rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
											}}>
											<p
												style={{
													fontSize: 22,
													fontWeight: 300,
													marginTop: 20,
												}}>
												{this.state.numberTicketsTrain}
											</p>
										</div>
									</div>
								</div>			
							</div>
								
						</div>
						{/*=============Fin Panel Train================*/}
						<div
							className={"divNCWhite flexCenter"}
							style={{
								backgroundColor: "transparent",
								justifyContent: "space-between",
							}}>
							<div
								id={"divMesCartes"}
								className={"divNCWhite flexCenter"}
								style={{ width: "49%", margin: 0, height: "100%" }}>
								<div
									className={"flexCenter"}
									style={{
										position: "relative",
										width: "100%",
										height: "100%",
									}}>
									<h1
										style={{
											fontWeight: 300,
											fontSize: 25,
											fontFamily: "LEMONMILK",
											position: "absolute",
											top: 0,
										}}>
										Mes cartes de réduction
									</h1>
									{this.state.loadingCards ? (
										<div
											style={{
												width: "100%",
												height: "100%",
												flexDirection: "column",
											}}
											className={"flexCenter"}>
											<CircularProgress
												style={{ color: "#000" }}></CircularProgress>
											<h3
												style={{
													width: "100%",
													textAlign: "center",
													fontWeight: 300,
												}}
												className={"loadingText"}>
												Chargement en cours
											</h3>
										</div>
									) : (
										<>
											{this.state.myCards.length === 0 ? (
												<div
													style={{
														width: "100%",
														height: "100%",
														flexDirection: "column",
													}}
													className={"flexCenter"}>
													<h3
														style={{
															width: "100%",
															textAlign: "center",
															fontWeight: 300,
														}}>
														Vous ne possédez aucune carte pour le moment
													</h3>
												</div>
											) : (
												<div
													style={{
														display: "flex",
														justifyContent: "space-evenly",
														alignItems: "flex-start",
														flexWrap: "wrap",
														overflow: "auto",
														height: "calc(100% - 85px)",
														margin: 15,
														marginTop: 100,
													}}>
													{this.state.myCards.map((item, index) => (
														<div
															key={index}
															className={"divItem flexCenter"}
															style={{
																flexDirection: "column",
																justifyContent: "space-between",
																position: "relative",
															}}>
															<div
																className={"flexCenter"}
																style={{
																	width: "95%",
																	height: 1,
																	position: "relative",
																	justifyContent: "space-between",
																	marginTop: 15,
																}}>
																{this.state.discountIDApplied === item.id ? (
																	<div className={"flexCenter"}>
																		<div
																			style={{
																				backgroundColor: "#26b400",
																				width: 15,
																				height: 15,
																				borderRadius: "50%",
																			}}
																		/>
																		<h3
																			style={{
																				fontWeight: 200,
																				margin: 5,
																				color: "#26b400",
																			}}>
																			Réduction active
																		</h3>
																	</div>
																) : (
																	<div></div>
																)}
																<Tooltip
																	title={"Afficher les détails de la carte"}>
																	<Info
																		onClick={() => {
																			this.setState({ detailCard: item });
																		}}
																		className={"imageButton"}
																		style={{ cursor: "pointer" }}
																	/>
																</Tooltip>
															</div>
															<div
																style={{
																	width: 120,
																	height: 100,
																	position: "relative",
																}}>
																<img
																	style={{
																		width: 120,
																		height: 120,
																		position: "absolute",
																		top: -10,
																	}}
																	src={require("../assets/carte" +
																		item.discount +
																		".png")}
																	alt={"carte" + item.discount + "%"}
																/>
															</div>
															<button
																style={{ marginBottom: 5 }}
																onClick={() => {
																	this.setState({ cardToTransfer: item });
																}}
																className={"divButton"}>
																Transférer
															</button>
														</div>
													))}
												</div>
											)}
										</>
									)}
								</div>
							</div>
							<div
								id={"div"}
								className={"divNCWhite flexCenter"}
								style={{ width: "49%", margin: 0 }}>
								<div
									className={"flexCenter"}
									style={{
										position: "relative",
										width: "100%",
										height: "100%",
										overflow: "hidden",
									}}>
									<h1
										style={{
											fontWeight: 300,
											fontSize: 25,
											fontFamily: "LEMONMILK",
											position: "absolute",
											top: 0,
										}}>
										Cartes en vente
									</h1>
									{this.state.loadingCards ? (
										<div
											style={{
												width: "100%",
												height: "100%",
												flexDirection: "column",
											}}
											className={"flexCenter"}>
											<CircularProgress
												style={{ color: "#000" }}></CircularProgress>
											<h3
												style={{
													width: "100%",
													textAlign: "center",
													fontWeight: 300,
												}}
												className={"loadingText"}>
												Chargement en cours
											</h3>
										</div>
									) : (
										<>
											{this.state.cardsToDisplay.length === 0 ? (
												<div
													style={{
														width: "100%",
														height: "100%",
														flexDirection: "column",
													}}
													className={"flexCenter"}>
													<h3
														style={{
															width: "100%",
															textAlign: "center",
															fontWeight: 300,
														}}>
														Aucune carte n'est à la vente pour le moment
													</h3>
												</div>
											) : (
												<div
													style={{
														display: "flex",
														justifyContent: "space-evenly",
														alignItems: "flex-start",
														flexWrap: "wrap",
														overflow: "auto",
														height: "calc(100% - 85px)",
														margin: 15,
														marginTop: 100,
													}}>
													{this.state.cardsToDisplay.map((item, index) => (
														<div
															key={index}
															className={"divItem flexCenter"}
															style={{
																flexDirection: "column",
																justifyContent: "space-between",
															}}>
															{/*<p style={{fontSize:18, fontWeight:300, margin:0, textAlign:"center", height:24, maxHeight:24, overflow:"hidden"}}>{item.title}</p>*/}
															<div
																className={"flexCenter"}
																style={{
																	width: "95%",
																	height: 1,
																	position: "relative",
																	justifyContent: "space-between",
																	marginTop: 15,
																}}>
																<div></div>
																<Tooltip
																	title={"Afficher les détails de la carte"}>
																	<Info
																		onClick={() => {
																			this.setState({ detailCard: item });
																		}}
																		className={"imageButton"}
																		style={{ cursor: "pointer" }}
																	/>
																</Tooltip>
															</div>
															<div
																style={{
																	width: 120,
																	height: 100,
																	position: "relative",
																}}>
																<img
																	style={{
																		width: 120,
																		height: 120,
																		position: "absolute",
																	}}
																	src={require("../assets/carte" +
																		item.discount +
																		".png")}
																	alt={"carte" + item.discount + "%"}
																/>
															</div>

															<p
																style={{
																	fontSize: 18,
																	fontWeight: 700,
																	margin: 5,
																	textAlign: "center",
																}}>
																Prix :{" "}
																<span
																	style={{ fontWeight: 300, marginRight: 5 }}>
																	{item.price}
																</span>
																Wei
															</p>
															<button
																style={{ marginBottom: 5 }}
																onClick={() => {
																	this.buyCard(item);
																}}
																className={"divButton"}>
																Acheter
															</button>
														</div>
													))}
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Home;
