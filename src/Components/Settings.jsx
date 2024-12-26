import React from 'react';
import styled from 'styled-components';
import { FaUser, FaHeart, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import ProfilePage from './Profile';


const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 10px 15px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #f0f0f0;
  &:first-child {
    border-top: none;
  }

  &:hover {
    background-color: #f0f8ff;
    cursor: pointer;
  }
`;

const Label = styled.div`
  font-size: 14px;
  color: #555;
`;

const Value = styled.div`
  font-size: 14px;
  color: #888;
`;

const Settings = () => {

    const Settings = () => {
        return (
            <Container>
                <Section>
                    <SectionTitle><strong>Settings</strong></SectionTitle>
                    <Item>
                        <Label><FaUser />{ProfilePage} </Label>
                        
                    </Item>
                    <Item>
                        <Label><FaHeart /> Favourites</Label>
                        <Value>Manage favourite locations</Value>
                    </Item>
                </Section>

                <Section>
                    <SectionTitle><strong>Others</strong></SectionTitle>
                    <Item>
                        <Label><FaInfoCircle /> About</Label>
                        <Value>8.37.1</Value>
                    </Item>
                    <Item>
                        <Label><FaSignOutAlt /> Logout</Label>
                    </Item>
                </Section>
            </Container>
        );
    };
    return (
        <Container>
            <Section>
                <SectionTitle><strong>Settings</strong></SectionTitle>
                <Item>
                    <Label>Profile</Label>
                    <Value></Value>
                </Item>
                <Item>
                    <Label>Favourites</Label>
                    <Value>Manage favourite locations</Value>
                </Item>
            </Section>

            <Section>
                <SectionTitle><strong>Others</strong></SectionTitle>
                <Item>
                    <Label>About</Label>
                    <Value>1.1.1</Value>
                </Item>
                <Item>
                    <Label>Logout</Label>
                </Item>
            </Section>
        </Container>
    );
};

export default Settings;
