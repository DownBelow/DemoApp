import React, {useState} from 'react';
import styled from 'styled-components';
import { Register, Login, ActivateCode, CreateAcessCode, GetPlayerData } from '../../../Services/API_User';
import { GetAddress } from '../../../Services/Metamask';
import { InputText } from '../../Assets/input';
import { BackgroundBanner, BackgroundBannerCard } from '../../Components/BackgroundBanners';
import { BackgroundButton } from '../../Assets/button';
import { FeatureTitle, Paragraph } from '../../Assets/typography';

const FormContainer = styled.div`
    width:800px;
    height:479px;
    background-image:url('https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg-double.png');
    display:flex;
    justify-content:space-between;
    padding: 14px;

    & fieldset{
        margin-bottom:10px;
    }
`

const ParagraphForm = styled.p `
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: #95989c;
`

const SubParagraphForm = styled.p `
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: #FFF;
    cursor: pointer;
`

const NewButton = styled.button `
    border-radius: 20px;
    border: 1px solid #FFF;
    background-color: #2E2E2E;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
    margin: 10px;
    display: flex;
    align-self: center;
`

const InactiveBUtton = styled.button `
    border-radius: 20px;
    border: 1px solid #FFF;
    background-color: grey;
    color: #black;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin: 10px;
    display: flex;
    align-self: center;
`

const ErrorText = styled.p `
    color:${props => props.theme.colors.primary};
`

export function LoginForm (props) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [using, setUsing] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function LoginResult (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        if(localStorage.getItem("wallet")){
            console.log("THERE IS WALLET")
            GetPlayerData((playerData) => {
                console.log("GOT DATA", playerData.data.walletAddress);
                console.log("COMPARE", localStorage.getItem("wallet"))
                if(playerData.data.walletAddress.toLowerCase() === localStorage.getItem("wallet"))
                {
                    localStorage.setItem("email", email);
                    localStorage.setItem("id", response.data.user.id);
                    localStorage.setItem("name", response.data.user.name);

                    props.onEnter();
                }else{
                    setUsing(false);
                    setError("Current Wallet address different then the one for this user");
                }
            })
        }
        else{
            setUsing(false);
            setError("No wallet saved, please disconnect your wallet and reconnect");
        }
    }

    function SendLogin(){
        setUsing(true);
        Login(email, password, LoginResult, LoginFailed);
    }


    function LoginFailed(){
        setUsing(false);
        setError("Login Failed");
    }

    function RegisterResult () {
        CreateAcessCode(email, () => console.log("AccessCode Requested"));
        localStorage.setItem("email", email);
        props.onValidate();
        setUsing("false");
    }

    function FailedRegister(){
        setError("Registration Error");
        setUsing(false);
    }

    function SendRegister(){
        setError("");
        if(password !== confirmPassword)
        {
            setError("Password don't match");
            return;
        }

        if(email !== confirmEmail)
        {
            setError("Emails don't match");
            return;
        }

        Register(name, email, password, RegisterResult, FailedRegister);
        setUsing(true);
    }

    return <FormContainer>
        <BackgroundBannerCard src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg-half.png" title="SIGN IN">
            <InputText placeholder="Email" type="email" stateValue={loginEmail} stateChange={e => setLoginEmail(e.target.value)}>Email</InputText>
            <InputText placeholder="Password" type="password" stateValue={loginPassword} stateChange={e => setLoginPassword(e.target.value)}>Password</InputText>
            <SubParagraphForm>Forgot Password?</SubParagraphForm>
            {using && <InactiveBUtton>Login</InactiveBUtton>}
            {!using && <BackgroundButton src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg-large.png" onClick={() => SendLogin()}>Enter</BackgroundButton>}
            <p>Reset Password</p>
            <p>Validate Email Code</p>
            {error && <ErrorText>{error}</ErrorText>}
        </BackgroundBannerCard>
        <BackgroundBannerCard src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg-half.png" title="REGISTER">
            <InputText placeholder="User Name" type="text" stateValue={name} stateChange={e => setName(e.target.value)}>Name</InputText>
            <InputText placeholder="Email" type="email" stateValue={email} stateChange={e => setEmail(e.target.value)}>Email</InputText>
            <InputText placeholder="Confirm Email"type="text" stateValue={confirmEmail} stateChange={e => setConfirmEmail(e.target.value)}>Confirm Email</InputText>
            <InputText placeholder="Password" type="password" stateValue={password} stateChange={e => setPassword(e.target.value)}>Password</InputText>
            <InputText placeholder="Confirm Password" type="password" stateValue={confirmPassword} stateChange={e => setConfirmPassword(e.target.value)}>Confirm Password</InputText>
            {using && <InactiveBUtton>Register</InactiveBUtton>}
            {!using && <BackgroundButton src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg-large.png" onClick={() => SendRegister()}>Submit</BackgroundButton>}
            {error && <ErrorText>{error}</ErrorText>}
        </BackgroundBannerCard>
    </FormContainer>
}

const ConfirmationCodeStyle = styled.div`
    & fieldset{
        margin-bottom:${props => props.theme.margins.half};
    }

    & button, p{
        margin-bottom:${props => props.theme.margins.half};
    }

    & h4{
        padding:10px 48px;
        margin:0px;
    }
`

export function ConfirmationCode (props){
    const [code, setCode] = useState("");

    function RegisterResult (response) {
        console.log("Confirmation Code Accepted");
        props.onValidate();
    }

    return <ConfirmationCodeStyle>
        <BackgroundBanner title="VALIDATION CODE" src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/card-bg.png">
            <InputText icon="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/Icons/Lock.png" type="text" placeholder="Code" stateValue={code} stateChange={e => setCode(e.target.value)}>Code</InputText>
            <BackgroundButton handleClick={() => ActivateCode(localStorage.getItem('email'), code, RegisterResult)} src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Assets/button-bg.png">
                <FeatureTitle>ENTER</FeatureTitle>
            </BackgroundButton>
            <Paragraph>Didn't received a confirmation code?<br/>Please check your spam folder</Paragraph>
            <Paragraph >Send again</Paragraph>
        </BackgroundBanner>
    </ConfirmationCodeStyle>
}