import React from 'react';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import AccountInfo from "./AccountInfo";
import Subscription from "./Subscription";
import CreditCard from "./CreditCard";
import Container from "../../components/Container/Container";

const AccountSettingPage = () => {

  return (
    <React.Fragment>
      <Container>
        <div className='flex justify-center flex-wrap mt-10'>
          <AccountInfo />
          <Subscription />
          <CreditCard />
        </div>
      </Container>
    </React.Fragment>
  )
};

export default AccountSettingPage;
