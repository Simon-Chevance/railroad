import { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import Axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const metamaskProvider = window.ethereum;
const web3 = new Web3(metamaskProvider);
const jwtApi = require("../keys/apiAccess.json").JWT;

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
const ContractCards = new web3.eth.Contract(
	contractCardABI, // import the contracts's ABI and use it here
	"0x9eF7cDC80d56769D0428E5dAA17C6252ce203406",
	{
		gasPrice: "20000000000",
		gasLimit: 1000000,
	}
);

const FileUpload = () => {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState();
	const [price, setPrice] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedDiscount, setSelectedDiscount] = useState(10);
	const [inProgress, setInProgress] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const changeDiscount = (discountTotal) => {
		setSelectedDiscount(discountTotal);
	};

	const changePrice = (event) => {
		setPrice(event.target.value);
	};

	const changeTitle = (event) => {
		setTitle(event.target.value);
	};

	const changeDescription = (event) => {
		setDescription(event.target.value);
	};

	const changeInProgress = (value) => {
		setInProgress(value);
	};

	const handleSubmission = async () => {
		web3.eth.requestAccounts().then((accounts) => {
			changeInProgress(true);
			if (accounts && accounts.length > 0) {
				const formData = new FormData();

				formData.append("file", selectedFile);

				const metadata = JSON.stringify({
					name: selectedFile.name,
				});
				formData.append("pinataMetadata", metadata);

				const options = JSON.stringify({
					cidVersion: 0,
				});
				formData.append("pinataOptions", options);

				try {
					Axios.post(
						"https://api.pinata.cloud/pinning/pinFileToIPFS",
						formData,
						{
							maxBodyLength: "Infinity",
							headers: {
								"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
								Authorization: "Bearer " + jwtApi,
							},
						}
					).then((response) => {
						if (response.status === 200) {
							if (response.status === 200) {
								ContractCards.methods
									.mint(
										"https://gateway.pinata.cloud/ipfs/" +
											response.data.IpfsHash,
										price,
										selectedDiscount,
										title,
										description
									)
									.send({ from: accounts[0], gasPrice: "20000000000" })
									.then((result) => {
										changeInProgress(false);
										navigate(0);
									});
							}
						}
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				window.location.replace("/");
				console.log("user not connected");
			}
		});
	};

	return (
		<div
			style={{ flexDirection: "column", justifyContent: "flex-start" }}
			className={"flexCenter"}>
			<div className={"flexCenter"}>
				<p style={{ marginRight: 10 }}>Nom : </p>
				<input
					className={"inputDiv"}
					name={"titleValue"}
					onChange={changeTitle}
					type="text"
				/>
			</div>
			<div className={"flexCenter"}>
				<p style={{ marginRight: 10 }}>Remise : </p>
				<div
					className={"flexCenter"}
					style={{ flexDirection: "column", margin: 5 }}>
					<div
						style={{ backgroundColor: selectedDiscount === 10 && "#737373" }}
						onClick={() => {
							changeDiscount(10);
						}}
						className={"selectDiv"}
					/>
					<p style={{ margin: 0 }}>10%</p>
				</div>
				<div
					className={"flexCenter"}
					style={{ flexDirection: "column", margin: 5 }}>
					<div
						style={{ backgroundColor: selectedDiscount === 25 && "#737373" }}
						onClick={() => {
							changeDiscount(25);
						}}
						className={"selectDiv"}
					/>
					<p style={{ margin: 0 }}>25%</p>
				</div>
				<div
					className={"flexCenter"}
					style={{ flexDirection: "column", margin: 5 }}>
					<div
						style={{ backgroundColor: selectedDiscount === 50 && "#737373" }}
						onClick={() => {
							changeDiscount(50);
						}}
						className={"selectDiv"}
					/>
					<p style={{ margin: 0 }}>50%</p>
				</div>
			</div>
			<div className={"flexCenter"}>
				<p style={{ marginRight: 10 }}>Prix (Wei) : </p>
				<input
					className={"inputDiv"}
					placeholder={"1000"}
					name={"priceValue"}
					onChange={changePrice}
					type="text"
				/>
			</div>
			<div className={"flexCenter"}>
				<p style={{ marginRight: 10 }}>Description : </p>
				<input
					className={"inputDiv"}
					name={"descriptionValue"}
					onChange={changeDescription}
					type="text"
				/>
			</div>

			<div style={{ flexDirection: "row" }} className={"flexCenter"}>
				<label>Image :</label>
				<input className={"inputDiv"} type="file" onChange={changeHandler} />
			</div>
			<button
				disabled={
					selectedFile === undefined ||
					price === 0 ||
					title === "" ||
					description === "" ||
					inProgress
				}
				style={{ margin: 10 }}
				className={"divButton"}
				onClick={handleSubmission}>
				{inProgress ? (
					<CircularProgress style={{ color: "#fff" }} />
				) : (
					"Valider"
				)}
			</button>
		</div>
	);
};

export default FileUpload;
