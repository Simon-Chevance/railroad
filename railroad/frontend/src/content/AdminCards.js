import React, {Component} from 'react';
import {Backdrop, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Tooltip} from "@mui/material";
import Web3 from 'web3'
import {CheckCircleOutline, Info, ListAlt, Palette, Security, Sell, Store, Style} from "@mui/icons-material";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
// const metamaskProvider = window.ethereum;
// const web3 = new Web3("http://127.0.0.1:7545");
import HeaderLink from "../hooks/HeaderLink";
import FileUpload from "../hooks/FileUpload";
const metamaskProvider = window.ethereum;
const web3 = new Web3(metamaskProvider);
const metamaskAccount = ""
const jwtApi = require("../keys/apiAccess.json").JWT


const contractCardABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"uri","type":"string"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CheckIfAdmin","outputs":[{"internalType":"bool","name":"isAdmin","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_tokenID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cardsID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllCards","outputs":[{"components":[{"internalType":"bool","name":"sold","type":"bool"},{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"discount","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"}],"internalType":"struct CardContract.CardInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getDiscount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_discount","type":"uint256"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

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
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

class AdminCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMainContent:false,
            connected:false,
            admin:false,
            account:"",
            hideConnexion:false,
            cards:[],
            detailCard:{},
        };
    }
    componentDidMount() {
        let self = this
        web3.eth.requestAccounts().then((accounts) => {
            if (accounts && accounts.length > 0) {
                self.setState({connected:true,admin:true,displayMainContent:true,account:accounts[0]},()=>{
                    ContractCards.methods.CheckIfAdmin().call({from:accounts[0],gasPrice:"20000000000"}).then((result) => {
                        if(result){
                            this.setState({admin:result})
                        }else{
                            window.replace("/Home")
                        }
                    })
                    ContractCards.methods.getAllCards().call({from:accounts[0],gasPrice:"20000000000"}).then((result) => {
                        this.setState({cards:result})
                    })
                })
                setTimeout(()=>{
                    self.setState({hideConnexion:true})
                },2000)
            } else {
                window.location.replace("/")
                Toast.fire({
                    icon: 'error',
                    title: 'Connexion échouée'
                })
                console.log("user not connected");
            }
        })
    }

    goToPage(clickedPage){
        window.history.replaceState(null, null, window.location.pathname);
        window.location.pathname !== clickedPage ? this.props.history.push(clickedPage):window.location.reload()
        this.setState({displayMenuMobile:false})
    }

    handleChange(event){
        this.setState({
            [event.currentTarget.name] : event.currentTarget.value
        })
    }

    render() {
        return (
            <div style={{height:"100vh",width:"100vw",display:"flex", justifyContent:"center",alignItems:"center", backgroundColor:"#FFFFFF", overflow:"hidden",flexDirection:"column"}}>
                <Dialog
                    open={this.state.displayCardCreation}
                    onClose={()=>{this.setState({displayCardCreation: false})}}
                >
                    <DialogTitle>
                        <h2 style={{marginTop:0}}>Créer une carte de réduction </h2>
                    </DialogTitle>
                    <DialogContent style={{padding:0,paddingLeft:8,paddingRight:8}}>
                        <div style={{flexDirection:"column"}} className={"flexCenter"}>
                            <FileUpload/>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={Object.keys(this.state.detailCard).length > 0}
                    onClose={()=>{this.setState({detailCard: {}})}}
                >
                    <DialogTitle>
                        <h2 style={{marginTop:0, marginBottom:0}}>Detail de la carte</h2>
                    </DialogTitle>
                    <DialogContent style={{padding:0,paddingLeft:8,paddingRight:8}}>
                        {Object.keys(this.state.detailCard).length > 0 && (
                            <div style={{flexDirection:"column"}} className={"flexCenter"}>
                                <p style={{fontSize:18, fontWeight:700, margin:0, textAlign:"center", height:24, maxHeight:24, overflow:"hidden",marginTop:10}}>Nom : <span style={{fontWeight:300}}>{this.state.detailCard.title}</span></p>
                                <p style={{fontSize:18, fontWeight:700, margin:0, textAlign:"center", height:24, maxHeight:24, overflow:"hidden"}}>Image : <a href={this.state.detailCard.tokenURI} target={"_blank"} style={{fontWeight:300, margin:0}}>Lien</a></p>
                                <p style={{fontSize:18, fontWeight:700, margin:0, textAlign:"center"}}>Description : <span style={{fontWeight:300}}>{this.state.detailCard.description}</span></p>
                                <p style={{fontSize:18, fontWeight:700, margin:0, textAlign:"center"}}>Réduction :<span style={{marginRight:5,fontWeight:300}}> {this.state.detailCard.discount}</span>%</p>
                                <p style={{fontSize:18, fontWeight:700, margin:0, textAlign:"center", marginBottom:5}}>Prix d'achat :<span style={{marginRight:5,fontWeight:300}}> {this.state.detailCard.price}</span>Wei</p>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


                {/*=================HEADER===================*/}
                <div className={"flexCenter backgroundGradient"} style={{width:'100%', height:70}}>
                    <div onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/Accueil', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/Accueil")}} style={{display:"flex",cursor:"pointer", justifyContent:"center", alignItems:"center",width:"fit-content"}}>
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center", padding:0, userSelect:"none", marginLeft:20, width:'fit-content'}}>
                            <img style={{width:50, marginRight:15}} className={"gradientLogo"} src={require("../assets/trainLogoColor2.png")} alt="NAVI CHAIN LOGO"/>
                            <h1 style={{fontWeight:300, fontSize:25, fontFamily:"LEMONMILK", width:"fit-content"}} className={"gradientLogo"}>NAVI CHAIN</h1>
                        </div>
                    </div>
                    <div style={{display:"flex",width:"100%"}}>
                        <>
                            <div style={{display:"flex",width:"90%", justifyContent:"space-evenly", alignItems:"center", marginLeft:0, marginRight:20}}>
                                {/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/MesConcepts', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/MesConcepts")}} className={"menuNC flexCenter"}><Style style={{marginRight:5}}/>Acheter un ticket</div>*/}
                                {/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/Catalogue', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/Catalogue")}} className={"menuNC flexCenter"}><Sell style={{marginRight:5}}/>Acheter une carte</div>*/}
                                {/*<div style={{color:"#FFF",fontFamily:"LEMONMILK"}} onAuxClick={(e)=>{if(e.button===1){window.open('/BtoBDesign/Catalogue', "_blank")}}} onClick={()=>{this.goToPage("/BtoBDesign/Catalogue")}} className={"menuNC flexCenter"}><ListAlt style={{marginRight:5}}/>Liste des transactions</div>*/}
                                <HeaderLink target={"Home"}/>
                                <HeaderLink target={"AdminCards"}/>
                            </div>
                        </>
                    </div>
                </div>
                {/*=================FIN=HEADER===============*/}
                {this.state.displayMainContent && this.state.admin && (
                    <div className={"backgroundGradientLight"} style={{flexDirection:"column",height:"100%",width:"100%",display:"flex", justifyContent:"center",alignItems:"center", overflow:"auto",transition:"all 1.5s cubic-bezier(.25,.8,.25,1)",animation:"all 1.5s cubic-bezier(.25,.8,.25,1)"}}>
                        <div className={"divNCWhite"} id={"divTickets"} style={{marginBottom:8, justifyContent:"space-evenly", overflow:"auto"}}>
                            <div className={"flexCenter"} style={{position:'relative', width:"100%", marginBottom:20}}>
                                <h1 className={"flexCenter"} style={{fontWeight:300, fontSize:25, fontFamily:"LEMONMILK", position:"absolute", top:0}}>
                                    Créer des cartes
                                    <Tooltip title={"Toutes les cartes visibles ici sont en vente sur la page d'accueil."}>
                                        <Info style={{color:"#888888", marginLeft:5, transform:"scale(1.1)"}}/>
                                    </Tooltip>
                                </h1>
                                <div style={{display:"flex",justifyContent:"space-evenly", alignItems:"flex-start",flexWrap: "wrap", overflow:"auto", height:"calc(100% - 65px)", margin:15, marginTop:80}}>
                                    <div onClick={()=>{this.setState({displayCardCreation:true})}} style={{cursor:"pointer"}} className={"divItem flexCenter"}>
                                        <img style={{width:120, height:120}} src={require("../assets/carteNew.png")} alt="carte50%"/>
                                        <p style={{fontSize:18, fontWeight:300, marginTop:0, textAlign:"center"}}>Créer une carte</p>
                                    </div>
                                    {this.state.cards.map((item, index)=>(
                                        <>
                                            {(item.tokenURI !=="" && item.sold === false) &&(
                                                <div key={index} className={"divItem flexCenter"} style={{flexDirection:"column", justifyContent:"space-between"}}>
                                                    <div className={"flexCenter"} style={{width:"95%", height:1, position:"relative", justifyContent:"space-between", marginTop:15}}>
                                                        <div></div>
                                                        <Tooltip title={"Afficher les détails de la carte"}>
                                                            <Info onClick={()=>{this.setState({detailCard:item})}} className={"imageButton"} style={{cursor:"pointer"}}/>
                                                        </Tooltip>
                                                    </div>
                                                    <p style={{fontSize:18, fontWeight:300, margin:0, textAlign:"center", height:24, maxHeight:24, overflow:"hidden"}}>{item.title}</p>
                                                    <div style={{width:120, height:100}}>
                                                        <img style={{width:120, height:120, position:"absolute"}} src={require("../assets/carte"+item.discount+".png")} alt={"carte" + item.discount + "%"}/>
                                                    </div>
                                                    <p style={{fontSize:18, fontWeight:300, margin:0, textAlign:"center", height:48, maxHeight:48, overflow:"hidden"}}>{item.description}</p>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default (AdminCards)