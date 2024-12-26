import React from "react";
import styled from "styled-components";

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fefefe;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  background: linear-gradient(to right, #ffdb70, #f7c948);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  position: relative;
`;

const BackIcon = styled.span`
  position: absolute;
  left: 16px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const RewardsSection = styled.div`
  background: #fef8e7;
  padding: 16px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 600px;
  width: 90%;
`;

const RewardsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const RewardCard = styled.div`
  flex: 1;
  text-align: center;
  padding: 16px;
  background: #fff;
  margin: 0 8px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const RewardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #f7c948;
`;

const RewardLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

// Component
const MyRewards = () => {
  const coinRewards = 0; // Dynamic data
  const vouchers = 0; // Dynamic data

  const handleBack = () => {
    // Add back navigation functionality
    console.log("Back button clicked");
  };

  return (
    <PageWrapper>
      <Header>
        My Rewards
      </Header>
      <RewardsSection>
        <RewardsGrid>
          <RewardCard>
            <RewardValue style={{ color: '#ff6347' }}>{coinRewards}</RewardValue>
            <RewardLabel>Coin Rewards</RewardLabel>
          </RewardCard>
          <RewardCard>
            <RewardValue style={{ color: '#4682b4' }}>{vouchers}</RewardValue>
            <RewardLabel>Vouchers</RewardLabel>
          </RewardCard>
        </RewardsGrid>
      </RewardsSection>
    </PageWrapper>
  );
};

export default MyRewards;
