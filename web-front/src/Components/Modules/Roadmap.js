import React from 'react';
import { ContainerCloseGrid, BasicContainer } from '../Components/Containers';
import { SecondSectionTitle } from '../Assets/typography';
import { RoadmapCard } from '../Components/Roadmap';
import { Paragraph } from '../Assets/typography';



export function RoadMapModule (props) {
    return <BasicContainer id="roadmap" variant="primary">
        <SecondSectionTitle variant="primary">ROAD MAP</SecondSectionTitle>
        <ContainerCloseGrid columns="5">
            <RoadmapCard title="Q4 2021">
            <li><Paragraph>Private Sale (December)</Paragraph></li>      
            </RoadmapCard>
            <RoadmapCard title="Q1 2022">
            <li><Paragraph>Public Sale (January)</Paragraph></li>
            <li><Paragraph>Token Launch (January)</Paragraph></li>
            <li><Paragraph>Idle PVE Mode release (January)</Paragraph></li>
            <li><Paragraph>PVE Adventure Testnet release (February)</Paragraph></li>
            <li><Paragraph>PVE Adventure Official release (March)</Paragraph></li>
            <li><Paragraph>PVE Boss Fight Release (March)</Paragraph></li>
            </RoadmapCard>
            <RoadmapCard title="Q2 2022">
            <li><Paragraph>PVP Abyss Arena Testnet release</Paragraph></li>
            <li><Paragraph>PVP Abyss Arena Official release</Paragraph></li>
            </RoadmapCard>
            <RoadmapCard title="Q3 2022">
            <li><Paragraph>Coming soon</Paragraph></li>
            </RoadmapCard>
            <RoadmapCard title="Q4 2022">
            <li><Paragraph>Coming soon</Paragraph></li>
        </RoadmapCard>
    </ContainerCloseGrid>
</BasicContainer>
}