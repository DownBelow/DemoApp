import React from 'react';
import styled from 'styled-components';

const VideoPlayerStyle = styled.video`
    width:80%;
    aspect-ratio:16/9;
    display:flex;
    align-items:center;
    justify-content:center;
    background: white;
    border-radius: 8px;

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width:100%;
    }  
`

export function VideoPlayer (props) {
    return <VideoPlayerStyle controls='true'>
        <source src={props.src} type="video/mp4"/>
        <source src={props.src} type="video/ogg"/>
        Your browser does not support the video tag.
    </VideoPlayerStyle>
}

const VideoDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    vertical-align: middle;
    position:relative;

    & > img{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        width:30vw;
    }

    @media (max-width: 480px) {
        width: unset;
        height: 110vw;
        margin-left: 0px;

        & > img{
            position:absolute;
            width:50vw;
            display:
        }
    }  
`

const VideoBackgroundStyle = styled.video`
    width: 100%;
    display: block;
    vertical-align: middle;

    @media (max-width: 480px) {
        width: unset;
        height: 110vw;
        margin-left: -60vw;
    }  
`

export function VideoBackground (props) {
    return <VideoDiv>
        <VideoBackgroundStyle autoPlay="true" muted loop>
            <source src={props.src} type="video/mp4"/>
            <source src={props.src} type="video/ogg"/>
            Your browser does not support the video tag.
        </VideoBackgroundStyle>
        <img src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/Logos/Logo_main.png"></img>
    </VideoDiv>
}

