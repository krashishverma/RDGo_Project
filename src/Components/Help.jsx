import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  font-family: "Arial", sans-serif;
  background-color: #f7f8fa;
  height: 100vh;
`;

const Header = styled.div`
  padding: 12px 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 16px 0;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    margin-left: 8px;
    font-size: 14px;
    flex: 1;
  }

  svg {
    color: #888;
  }
`;

const TopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopicItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TopicIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #eef3f8;
  border-radius: 50%;
  margin-right: 12px;
  font-size: 18px;
  color: #007bff;
`;

const TopicText = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;


import { FaSearch, FaShieldAlt, FaCarSide, FaUser, FaWallet, FaHandshake, FaTicketAlt } from "react-icons/fa";

const HelpTopic = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    { icon: <FaShieldAlt />, text: "Safety & Security" },
    { icon: <FaCarSide />, text: "Ride & Billing" },
    { icon: <FaUser />, text: "Services" },
    { icon: <FaUser />, text: "Account & App" },
    { icon: <FaHandshake />, text: "Referrals" },
    { icon: <FaWallet />, text: "Payment & Wallets" },
    { icon: <FaTicketAlt />, text: "Power Pass" },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Help</Title>
      </Header>
      <SearchBar>
        <FaSearch />
        <input
          type="text"
          placeholder="Search Help Topics"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      <TopicsContainer>
        {filteredTopics.map((topic, index) => (
          <TopicItem key={index}>
            <TopicIcon>{topic.icon}</TopicIcon>
            <TopicText>{topic.text}</TopicText>
          </TopicItem>
        ))}
      </TopicsContainer>
    </Container>
  );
};



export default HelpTopic;
