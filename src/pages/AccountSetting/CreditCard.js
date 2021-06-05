import React from 'react';
import { useSelector } from "react-redux";
import { history } from "../../index";
import ItemCard from "../../components/Card/ItemCard";
import InfoItem from "../../components/Card/InfoItem";

const CreditCard = () => {

  const credit_card = useSelector(state => state.authorizenet.credit_card);

  return (
    <ItemCard title="CREDIT CARD" className="md:w-1/3 sm:px-20 md:p-2">
      <InfoItem label="Card Type">
        {credit_card && credit_card.cardType}
      </InfoItem>
      <InfoItem label="Card Number">
        {credit_card && credit_card.cardNumber}
      </InfoItem>  
      <InfoItem label="Expiration">
        {credit_card && credit_card.expirationDate}
      </InfoItem>
      <div className='flex justify-center mt-5 mb-3'>
        <button className='button submit-button fill-button' onClick={() => history.push('/creditcard/update')}>
          UPDATE YOUR CARD
        </button>
      </div>
    </ItemCard>
  )
};

export default CreditCard;
