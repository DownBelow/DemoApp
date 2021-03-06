import React from 'react';
import styled from 'styled-components';
import { GradientHR } from '../Assets/hr';
import { FeatureTitle } from '../Assets/typography';
import { DivBackground } from '../Assets/image';

const BannerBackground = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:662px;
    position:relative;

    & * {
        z-index:2;
    }
`

export function BackgroundBanner (props) {
    return <BannerBackground>
        <DivBackground src={props.src}></DivBackground>
        <FeatureTitle>{props.title}</FeatureTitle>
        <GradientHR></GradientHR>
        {props.children}
    </BannerBackground>
}

const BannerBackgroundCard = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:370px;
    position:relative;

    & * {
        z-index:2;
    }
`

export function BackgroundBannerCard (props) {
    return <BannerBackgroundCard>
        <DivBackground src={props.src}></DivBackground>
        <FeatureTitle>{props.title}</FeatureTitle>
        <GradientHR></GradientHR>
        {props.children}
    </BannerBackgroundCard>
}