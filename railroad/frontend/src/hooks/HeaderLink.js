import {useNavigate} from "react-router-dom";
import {Home, Style} from "@mui/icons-material";

export default function HeaderLink(props) {
    let navigate = useNavigate();
    let toRender =
        <div
            style={{color:"#FFF",fontFamily:"LEMONMILK"}}
            onAuxClick={(e)=>{if(e.button===1){window.open("/"+props.target+"?td=true", "_blank")}}}
            onClick={()=>{navigate("/"+props.target+"?td=true")}}
            className={"menuNC flexCenter"}>
            {props.target === "AdminCards" ? (
                <Style style={{marginRight:5}}/>
            ):(
                <Home/>
            )}
            {props.target === "AdminCards" ? "Créer des cartes (admin)":"Accueil"}
        </div>
    return (
        toRender
    );
}