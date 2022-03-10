import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { GetInventory } from "../../Services/API_Purchase";
import { StayUpdated } from '../Modules/StayUpdated';
import { WhitelistWallet } from '../../Services/API_Whitelist';
import { ConfirmTransaction, GetStarterPacks } from "../../Services/API_Purchase";
import { CreateTransaction, CreateTransactionTestNet } from '../../Services/Metamask';
import { MainBar } from '../Modules/MainBar';
import styled, {keyframes} from 'styled-components';

const MainSection = styled.main`
    margin-top: 0px;
    padding: 64px 64px;
    background-color:${props=> props.theme.colors.fonts.primary};
    display:flex;
    flex-flow: row wrap;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    @media (max-width: 768px) {
        height:120vh;
    }

    @media (max-width: 480px) {
        
    }  
`;

const DivTop = styled.main `
     display: flex;
     flex-grow: 1;
`;

const DivTitle = styled.div `
    margin-top:40px; 
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: center;
    align-items:center;

    h1 {
        font-size: ${props => props.theme.fonts.sizes.secondtitle};
        color: white;
        font-family: ${props => props.theme.fonts.title};
    }

    p {
        font-size: ${props => props.theme.fonts.sizes.subtitle};
        font-family: ${props => props.theme.fonts.body};
        color: white;
        width: 50%;
        text-align: center;
        font-size: 20px;
        line-height: 2em;
    }

    li{
        font-size: ${props => props.theme.fonts.sizes.subtitle};
        font-family: ${props => props.theme.fonts.body};
        color: white;
        width: 50%;
        text-align: center;
    }

    @media (max-width: 768px) {
        line-height: 10vh;
        width: 100%;
        h1 {
            line-height: 20vh;
        }
    }

    @media (max-width: 480px) {
        line-height: 15vh;
        width: 100%;
        h1 {
            line-height: 30vh;
        }
    }  

`;

const DivStore = styled.div `
    display: flex;
    flex-direction:column;
    flex: 0 50.333333%;
    align-items: center;
    flex-direction: column;
    margin-top:40px;
`;

const DivBanner = styled.div `
    position: relative;
    min-height: 374px;
    width: 683px;
    height: 100%;

    & h1{
        color:white;
        font-size:40px;
        margin-bottom:40px;
    }

    & ul{
        margin-top:16px;
    }

    & li{
        color:white;
        list-style:none;
        margin-bottom:8px;
    }
    
    @media (max-width: 480px) {
        .text {
            margin-right: 0;
        }
    }  

`;

const Background = styled.img`
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border: 0;
    height: 378px;
    /* height: 683px; */
    width: 683px;
    aspect-ratio: 16/9;
`

const CantBuyButton = styled.button`
    font-size: ${props => props.theme.fonts.sizes.paragraph};
    font-family: ${props => props.theme.fonts.title};
    color: FFF;
    width:150px;
    box-shadow:inset 0px 1px 0px 0px #004e92;
    background-color: grey;
    background-size: 400%;
    border-radius: 26px;
    border:1px solid #000428;
    cursor:pointer;
    color:#ffffff;
    font-weight:bold;
    padding:5px 29px;
    text-decoration:none;
    text-shadow:0px 0px 0px #9b14b3;
    margin-top: 16px;

    &:hover {
        animation: gradientRotate 2s infinite;
        &::before {
          opacity: 1;
          animation: gradientRotate 2s infinite;
        }
      }

    @keyframes gradientRotate {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: 100% 100%;
        }
      }
`;

const BuyButton = styled.button`
    font-size: ${props => props.theme.fonts.sizes.paragraph};
    font-family: ${props => props.theme.fonts.title};
    color: FFF;
    width:150px;
    cursor: pointer;
    box-shadow:inset 0px 1px 0px 0px #004e92;
    background-image: linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef);
    background-size: 400%;
    border-radius: 26px;
    border:1px solid #000428;
    cursor:pointer;
    color:#ffffff;
    font-weight:bold;
    padding:11px 29px;
    text-decoration:none;
    text-shadow:0px 0px 0px #9b14b3;
    margin-top: 16px;

    &:hover {
        animation: gradientRotate 2s infinite;
        &::before {
          opacity: 1;
          animation: gradientRotate 2s infinite;
        }
      }

    @keyframes gradientRotate {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: 100% 100%;
        }
      }
`;

const TextContaniner = styled.div`
    position:absolute;
    z-index:1;
    right:80px;
    bottom:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
`

const PurchaseCounter = styled.h4`
    font-size: 14px;
    color: white;
    margin: 0 auto;
    margin-top: 8px;
`

const ChestContentText = styled.p`
    margin-top:16px;
    color:white;
    margin-bottom:60px;
`

const Modal = styled.div`
    width:100vw;
    position:fixed;
    height:100vh;
    top:0;
    left:0;
    background-color: #00000080;
    z-index:10000;
    display:flex;
    align-items:center;
    justify-content:center;

    & > div{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
        height:200px;
        background-color:#E0CBC9;
        border-radius:8px;
    }

    & h2{
        color:${props => props.theme.colors.primaryHover};
        font-family:'Balthazar';
        font-size:px;
    }

    & p {
        margin-top:16px;
        color:white;
        color:${props => props.theme.colors.primaryHover};
    }
`

const ErrorText = styled.h2`
    color:red;
    margin-top:20px;
`

const ModalHead = styled.div`
    padding:8px;
    background-color: #4C3B47;
    width:100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: center;

    & h2{
        color:#fff;
    }
`

const ModalBody = styled.div`
    padding:0px 16px;
    color:#4C3B47;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    & b{
        font-weight:600;
    }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadIcon = styled.img`
    margin-top:10px;
    animation: ${rotate} 4s infinite linear;
`

const LoadingText = styled.p`
   color:white;
`

const SupportText = styled.p`
    color:white;

    a{
        color:${props => props.theme.colors.primary};
    }
`

export function StorePage (props) {
    const [shop, setShop] = useState();
    const [loading, setLoading] = useState(true);
    const [invetory, setInventory] = useState([]);
    const [buying, setBuying] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [error, setError] = useState();
    const [whitelist, setWhitelist] = useState(true);
    const navegate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("email") === null){
            navegate("/Login");
            return null;
        }

        setShop([
            {
                id:"1",
                price:"1",
                name:"Starter Pack",
                src:"https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Portraits/pt6.png",
                rates: {
                    common: "65%",
                    uncommon:"20%",
                    rare:"10%",
                    epic:"3,5%",
                    legendary:"1,2%",
                    godlike:"0,3%"
                }
            },
            {
                id:"2",
                price:"2",
                name:"Epic Pack",
                src:"https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Portraits/pt7.png",
                rates: {
                    common: "10%",
                    uncommon:"30%",
                    rare:"52,5%",
                    epic:"5%",
                    legendary:"2%",
                    godlike:"0,5%"
                } 
            }
        ]);

        GetInventory((data) => {
            setInventory(data);
            setLoading(false);
        });
    }, [refresh]);

    function BuyChest (chest) {
        console.log("BUYING");
        WhitelistWallet((data) => {
            console.log(data);
            if(data === true){
                setWhitelist(true);
                setBuying(true);
                SendTransaction(chest);
            }else{
                setError("User Not on whitelist");
                setWhitelist(false);
            }
            
        });
    }

    function SendTransaction(chest){
        console.log("CREATING TRANSACTION");
        CreateTransactionTestNet(chest, SendReceipt, FailedPurchase);
        console.log();
    }

    function FailedPurchase(err){
        console.log(err);
        if(err.message != null){
            console.log("has error");
            err = err.message;
        }
        
        console.log(err);
        setError(err);
        setBuying(false);
    }

    function SendReceipt(chestID, receipt){
        console.log("SENDING RECEITP");
        ConfirmTransaction(chestID, receipt, () => {
            setError("");
            setBuying(false);
            setRefresh(refresh + 1);
        }, () => ConfirmTransaction);
    }

    document.onkeydown = capturekey;
    document.onkeypress = capturekey;
    document.onkeyup = capturekey;

    function capturekey(e) {
        e = e || window.event;
        //debugger
        if (e.code == 'F5') {
            if (alert('Refresh is disabled in this website')) {
                e.preventDefault()
                //allow to refresh
            } 
            else {
                //avoid from refresh
                e.preventDefault()
                e.stopPropagation()
            }
        }
    }

    function RenderShop (){
        if(!Array.isArray(invetory) || loading)
            return<LoadingText>Loading...</LoadingText>
            
        const basics = invetory.filter((element) => {return element.starterPacksId === "1"});
        const premmiuns = invetory.filter((element) => {return element.starterPacksId === "2"});

        return <DivStore>
            {basics.length <= 3 && Array.isArray(invetory) && <DivBanner>
                <TextContaniner className="text">
                    <ul>
                        <li>Common drop rate: {shop[0].rates.common}</li>
                        <li>Rare drop rate: {shop[0].rates.uncommon}</li>
                        <li>Epic drop rate: {shop[0].rates.rare}</li>
                        <li>Legendary drop rate: {shop[0].rates.epic}</li>
                        <li>Mythic drop rate: {shop[0].rates.legendary}</li>
                        <li>God-like drop rate: {shop[0].rates.godlike}</li>
                    </ul>
                    {!whitelist && <CantBuyButton>Not in whitelist</CantBuyButton>}
                    {!buying && whitelist && <BuyButton onClick={() => BuyChest(shop[0])}>${shop[0].price}.00</BuyButton>}
                    {buying && <BuyButton>Processing...</BuyButton>}
                    <PurchaseCounter>Purchases: {4 - basics.length}/4</PurchaseCounter>
                </TextContaniner>
                <Background src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Backgrounds/bg3.png"></Background>
            </DivBanner>
            }
            {basics.length <= 3 && <ChestContentText>Chest contains: 4 Heros, 4 Weapons, 8 skills</ChestContentText>}
            {premmiuns.length <= 1 && Array.isArray(invetory) && <DivBanner>
                <TextContaniner className="text">
                    <ul>
                        <li>Common drop rate: {shop[1].rates.common}</li>
                        <li>Rare drop rate: {shop[1].rates.uncommon}</li>
                        <li>Epic drop rate: {shop[1].rates.rare}</li>
                        <li>Legendary drop rate: {shop[1].rates.epic}</li>
                        <li>Mythic drop rate: {shop[1].rates.legendary}</li>
                        <li>God-like drop rate: {shop[1].rates.godlike}</li>
                    </ul>
                    {!whitelist && <CantBuyButton>Not in whitelist</CantBuyButton>}
                    {!buying && whitelist && <BuyButton onClick={() => BuyChest(shop[1])}>${shop[1].price}.00</BuyButton>}
                    <PurchaseCounter>Purchases: {2 - premmiuns.length}/2</PurchaseCounter>
                </TextContaniner>
                <Background src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Backgrounds/bg4.png"></Background>
            </DivBanner>
            }
            {premmiuns.length <= 1 && <ChestContentText>Chest contains: 4 Heros, 4 Weapons, 8 skills</ChestContentText>}
            <SupportText>need help?<a href="https://forms.gle/3LYEqaBQhob6U54CA" target="_blank">downbelow.support</a></SupportText>
        </DivStore>
    }   

    function RenderModal(){
        return <Modal>
            <div>
                <ModalHead>
                    <h2>Processing Purchase</h2>
                </ModalHead>
                <ModalBody>
                    <p><b>do not refresh</b> this page or <b>queue purchases</b></p>
                    <p>need help? <a href="https://forms.gle/3LYEqaBQhob6U54CA" target="_blank">downbelow.support</a></p>
                    <LoadIcon src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/Load-wheel.png"/>
                </ModalBody>
                <div/>
            </div>
        </Modal>
    }

    return <MainSection>
        <DivTop>
            <MainBar></MainBar>
        </DivTop>
        <DivTitle>
            <h1>Shop</h1>
        </DivTitle>
        {error && <ErrorText>{error}</ErrorText>}
        {buying && RenderModal()}
        {shop && invetory && RenderShop()}
    </MainSection>
}