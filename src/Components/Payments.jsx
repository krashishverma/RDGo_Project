// Payments.js

import React from "react";
import styled from "styled-components";

// Styled Components for Responsive Design

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 20px 0;

  h2 {
    color: #555;
    margin-bottom: 10px;
    font-size: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 10px auto;

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  img {
    width: 40px;
    margin-right: 10px;

    @media (max-width: 768px) {
      width: 30px;
    }
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }

    @media (max-width: 480px) {
      padding: 8px 15px;
    }
  }

  h4 {
    color: #555;
    font-size: 1.1rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  p {
    color: #777;
    margin-top: 5px;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const UpiSection = styled.div`
  h2 {
    color: #555;
    margin-bottom: 10px;
  }
`;

const UpiApp = styled.div`
  display: inline-block;
  background: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

const OthersSection = styled.div`
  div {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    width: 100%;
    max-width: 600px;
    margin: 10px auto;

    &:hover {
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);
    }

    h4 {
      color: #555;
    }

    p {
      color: #777;
      margin-top: 5px;
    }

    @media (max-width: 768px) {
      padding: 12px;
    }

    @media (max-width: 480px) {
      padding: 10px;
    }
  }
`;

// Payments Component
const Payments = () => {
  return (
    <Container>
      <Title>Payments</Title>

      {/* Wallets Section */}
      <Section>
        <h2>Wallets</h2>
        <Card>
          <div>
            <img src="wallet-icon.png" alt="Wallet" />
            <div>
              <h4>Rapido Wallet</h4>
              <p style={{ color: "red" }}>Low Balance: ₹0.0</p>
            </div>
          </div>
          <button>Add Money</button>
        </Card>

        <Card>
          <div>
            <img src="amazon-icon.png" alt="AmazonPay" />
            <div>
              <h4>AmazonPay</h4>
              <p>
                Cashback behind scratch card upto ₹25, assured ₹5 | min order ₹39
              </p>
            </div>
          </div>
          <button>LINK</button>
        </Card>
      </Section>

      <Divider />

      {/* Pay By UPI */}
      <UpiSection>
        <h2>Pay by any UPI app</h2>
        <UpiApp>GPay</UpiApp>
        <UpiApp>PhonePe</UpiApp>
        <UpiApp>Paytm</UpiApp>
        <UpiApp>Amazon</UpiApp>
        <UpiApp>Flipkart</UpiApp>
      </UpiSection>

      <Divider />

      {/* Pay Later Section */}
      <Section>
        <h2>Pay Later</h2>
        <Card>
          <div>
            <h4>Pay at drop</h4>
            <p>Go cashless, after ride pay by scanning QR code</p>
          </div>
        </Card>
        <Card>
          <div>
            <h4>Simpl</h4>
          </div>
          <button>LINK</button>
        </Card>
      </Section>

      <Divider />

      {/* Others Section */}
      <OthersSection>
        <h2>Others</h2>
        <div>
          <h4>Cash</h4>
          <p>You can pay via cash or UPI for your ride</p>
        </div>
        <div>
          <h4>Show Passbook</h4>
        </div>
      </OthersSection>
    </Container>
  );
};

export default Payments;
