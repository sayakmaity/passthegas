import React from "react";
import styled from "styled-components";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const Card = styled.div`
  background-color: rgba(255,225,225,0.7);
  color: #081056;
  border-radius: 8px;
  padding: 15px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: right;
  height: 350px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoCard = () => {

  return (
    <Card>
      <Content>
        <h4>Did you know...</h4>
        <p>A dishwasher uses between 1.2kWh and 1.5kWh per load</p>
        <p>Using a washing machine 3 times a week will use about 140.4 kilowatt-hours of electricity per year.</p>
        <p>Worldwide Youtube consumption ranges around 244 TWh per year. Ethereum PoS energy consumption ranges around 0.01 TWh per year</p>
      </Content>
    </Card>
  );
};

export default InfoCard;
