import React from 'react';
import styled from 'styled-components';

const ToolkitContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ToolkitParagraph = styled.p`
    font-size: 18px;
    color: #666;
    line-height: 2.5;
    margin-bottom: 16px;
`;
const ToolkitAnchor= styled.a`
    bold;
`;
const ToolkitHeader = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
`;

const ToolkitList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ToolkitListItem = styled.li`
    font-size: 18px;
    color: #555;
    margin-bottom: 8px;
`;

const Safety = () => {
    return (
        <ToolkitContainer>
            <ToolkitHeader>Safety Toolkit</ToolkitHeader>
           
            <ToolkitList>
            <ToolkitParagraph>At RDGo, your safety comes first. Here are some measures and provisions to ensure your safety.</ToolkitParagraph>
            <br />
            <a href="#">Know more</a>
            <br />
            <br />
                <ToolkitListItem>Wear appropriate personal protective equipment (PPE)</ToolkitListItem>
                <br />
                <ToolkitListItem>Follow safety protocols and guidelines</ToolkitListItem><br />
                <ToolkitListItem>Report any unsafe conditions or incidents</ToolkitListItem>
                {/* <ToolkitListItem>Keep your work area clean and organized</ToolkitListItem>
                <ToolkitListItem>Stay alert and focused on your tasks</ToolkitListItem> */}
            </ToolkitList>
        </ToolkitContainer>
    );
};

export default Safety;