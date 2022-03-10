import React from 'react';
import styled from 'styled-components';
import { ContainerColumnsCenter, BasicContainer } from '../Components/Containers';
import { SecondContentTitle } from '../Assets/typography';
import { SubTitle, FeatureTitle, Paragraph } from '../Assets/typography';
import { MaxSizeImage } from '../Assets/image';

const TokenSectionDiv = styled.div`
    & span {
        font-size:15px;
    }

    & img{
        aspect-ratio:1/1;
    }

    @media (max-width: 612px) {
        & h4{
            font-size:5vw;
        }
        & span{
            font-size:3.5vw;
        }
    }  
`

export function AbyssToken (props) {
    return <TokenSectionDiv id={props.id}>
        <BasicContainer variant="primary">
            <ContainerColumnsCenter columns="2" marginTop="64px">
                <div>
                    <SecondContentTitle id="token" variant="primary">$ABYSS TOKEN</SecondContentTitle>
                    <SubTitle>Official contract address</SubTitle>
                    <FeatureTitle>Coming soon</FeatureTitle>
                    <Paragraph>
                        <b>Game Release:</b><br/><br/>
                        <span>Down Below will be up to play on Q1/2022</span><br></br>
                        <span>You’ll be able to find $ABYSS on Pancakeswap on Q1/2022.</span>
                    </Paragraph>
                </div>
                <MaxSizeImage width="350px" src="https://downbelow-assets.s3.us-east-2.amazonaws.com/Assets/art/Portraits/pt5.png"></MaxSizeImage>
            </ContainerColumnsCenter>
        </BasicContainer>
    </TokenSectionDiv>
}




