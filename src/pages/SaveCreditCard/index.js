import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from "react-redux";
import Cards from 'react-credit-cards';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  reformatCardForAuthorizeNet
} from '../../utils/CardUtils';
import 'react-credit-cards/lib/styles.scss';
import '../../styles/form.style.scss'
import Loading from "../../components/Loading";
import { NotificationManager } from "react-notifications";
import SignaturePad from "react-signature-canvas";
import PageTitle from "../../components/Titles/PageTitle";
import Container from "../../components/Container/Container";

const SaveCreditCardPage = () => {

  const [user, authorizenet] = useSelector(state => [state.user, state.authorizenet]);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({});
  const [section, changeSection] = useState('card-form');  // card, sign
  const [sigPad, setSigPad] = useState();

  const onSetCard = async data => {
    const card = Object.assign({}, data);

    setPayload({
      card: reformatCardForAuthorizeNet(card),
    });

    changeSection('sign-form');
  };

  const onSubmit = async () => {
    if (sigPad.isEmpty()) {
      NotificationManager.error(
        'Sign to pad with your name!',
        'Alert',
      );
      return;
    }

    payload.signedBase64 = sigPad.toDataURL();
 console.log("sign pad",payload);
    dispatch({
      type: 'authorize.net/CREATE_CUSTOMER_PROFILE',
      payload: payload
    });
  };

  return (
    <React.Fragment>
      <Container className="mt-32">
      {section === 'card-form' ?
        <div className="flex flex-col items-center">
          <PageTitle title="SAVE YOUR CREDIT CARD" />
          <div className="text-xl text-center">
            <p style={{maxWidth: "700px"}}>
              Please be sure to MANUALLY enter your credit/debit card information and sign where indicated in order to process successfully.
            </p>
          </div>
          <Form
            onSubmit={onSetCard}
            render={({
                       handleSubmit,
                       submitting
                     }) => {
              return (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className='flex flex-col'>
                    <div className='input-wrapper'>
                      <Field
                        name="number"
                        type="text"
                        format={formatCreditCardNumber}
                        render={({ input }) => (
                          <div className="inline-block relative w-full" style={{maxWidth: "600px"}}>
                            <div className="pointer-events-none absolute inset-y-0 flex items-center px-2">
                              <img src="resources/icons/card-number.png"/>
                            </div>
                            <input  {...input}
                                    type="text"
                                    value={input.value || ''}
                                    pattern="[\d| ]{12,22}"
                                    placeholder="Card Number"
                                    required={true}
                                    style={{paddingLeft: "2.5rem"}}
                                    className="card-input block appearance-none w-full"/>
                          </div>
                        )}
                      />
                    </div>
                    <div className='input-wrapper'>
                      <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Name"
                        required={true}
                        className="card-input"
                      />
                    </div>
                    <div className='input-wrapper' style={{flexWrap: "nowrap"}}>
                      <Field
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="MM/YY"
                        required={true}
                        format={formatExpirationDate}
                        className="inline-card-input mr-4"
                      />
                      <Field
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="CVC"
                        required={true}
                        format={formatCVC}
                        className="inline-card-input"
                      />
                    </div>
                  </div>
                  <div className='input-wrapper my-5'>
                    <button
                      className="button form-button fill-button m-1"
                      type="submit"
                      disabled={submitting || authorizenet.loading}
                    >
                      SAVE
                      <Loading type="spin" color="#ffffff" height={18} width={18} />
                    </button>
                  </div>
                </form>
              )
            }}
          />

          <div className="text-center">
            <p>
              Automatically populated credit/debit card information is not accepted by the system. Thank you.
            </p>
          </div>
        </div>
        : <div className='flex flex-col items-center'>
            <PageTitle title="CREDIT CARD AUTHORIZATION FORM" />

            <div style={{ display: 'inline-block', maxWidth: '600px', fontSize: '1.2rem' }}>
              <p className="text-center font-italic">This authorization will remain in effect until cancelled.</p>

              <div>
                <p className="text-center">
                  I, <strong>{user.first_name} {user.last_name}</strong>, authorize SKIP FORCE to charge my credit card for
                  the monthly subscription, adding credits and batch list search requests. I understand that my information
                  will be saved to file for future transaction on my account.</p>

                <div className="p-3" style={{ border: "3px solid gray" }}>
                  <p>Signature Pad *</p>
                  <SignaturePad canvasProps={{ style: { border: '1px solid #aaaaaa', width: '100%', height: '150px' } }}
                                ref={(ref) => setSigPad(ref)} />
                  <button className="button small-button fill-button mt-4" onClick={() => sigPad.clear()}>Clear</button>
                </div>
              </div>
            </div>

            <div className='input-wrapper my-5'>
              <button
                className="button form-button fill-button m-1"
                type="button"
                disabled={authorizenet.loading}
                onClick={() => onSubmit()}
              >
                CONTINUE
                <Loading type="spin" color="#ffffff" height={18} width={18} />
              </button>
            </div>

            <div className='text-center'>
                <button onClick={() => {changeSection('card-form')}}>GO BACK</button>
            </div>
          </div>
        }
      </Container>
    </React.Fragment>
  )
};

export default SaveCreditCardPage;
