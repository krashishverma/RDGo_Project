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
    height: auto;
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

  img {
    width: 40px;
    margin: auto;
    display: block;

    @media (max-width: 768px) {
      width: 30px;
    }
  }
`;

const Payments = () => {
  return (
    <Container>
      <Title>Payments</Title>

      {/* Wallets Section */}
      <Section>
        <h2>Wallets</h2>
        <Card>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/54/Rapido_app_logo.png"
              alt="Rapido Wallet"
            />
            <div>
              <h4>Rapido Wallet</h4>
              <p style={{ color: "red" }}>Low Balance: ₹0.0</p>
            </div>
          </div>
          <button>Add Money</button>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Amazon_Pay_logo.png"
              alt="Amazon Pay"
            />
            <div>
              <h4>Amazon Pay</h4>
              <p>
                Cashback behind scratch card up to ₹25, assured ₹5 | min order
                ₹39
              </p>
            </div>
          </div>
          <button>Link</button>
        </Card>
      </Section>

      <Divider />

      {/* Pay By UPI */}
      <UpiSection>
        <h2>Pay by any UPI app</h2>
        <UpiApp>
          <img
            src="https://pay.google.com/about/static_kcs/images/logos/google-pay-logo.svg"
            alt="GPay"
          />
        </UpiApp>
        <UpiApp>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
            alt="PhonePe"
          />
        </UpiApp>
        <UpiApp>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Paytm_logo.png"
            alt="Paytm"
          />
        </UpiApp>
        <UpiApp>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
          />
        </UpiApp>
        <UpiApp>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/0c/Flipkart_logo.png"
            alt="Flipkart"
          />
        </UpiApp>
      </UpiSection>
    </Container>
  );
};

export default Payments;
