import React, { useState } from 'react'
import { Field, Form } from "react-final-form";
import '../../styles/form.style.scss'
import { history } from "../../index";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";

const VerifyEmailPage = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  const onSendRequest = () => {
    setStep(1);

    dispatch({
      type: 'user/REQUEST_LOGIN_CODE',
      payload: { user_id: user.id }
    })
  };

  const onVerifyCode = async payload => {
    setStep(2);

    payload.user_id = user.id;
    dispatch({
      type: 'user/VERIFY_LOGIN_CODE',
      payload: payload,
    })
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <div className="container pt-5">
          <div className="row">
            <div className='col-lg-3'>&nbsp;</div>
            <div className='col-lg-6 p-lg-5 text-center'>
              <img
                src="resources/images/logo-golden.png"
                alt="logo"
                style={{ height: "7rem" }}
              />

              <div className='auth-form-container'>
                <Form
                  onSubmit={onVerifyCode}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <p style={{ color: '#9b761c', fontSize: '1.5rem', fontWeight: 'lighter' }}>VERIFY</p>

                      <div className='mb-5'>
                        <button className='button small-button fill-button' type='button' disabled={user.loading}
                                onClick={() => onSendRequest()}>
                          <i className="fa fa-envelope-o mr-1" aria-hidden="true" /> SEND REQUEST
                          {step === 1 && <Loading type="spin" color="#ffffff" height={18} width={18} />}
                        </button>
                      </div>

                      <div className='input-wrapper'>
                        <Field name="code"
                               component="input"
                               placeholder="Verification Code"
                               required={true}
                        />
                      </div>

                      <div className='input-wrapper mt-3'>
                        <button className='button submit-button fill-button' type="submit" disabled={user.loading}>
                          VERIFY
                          {step === 2 && <Loading type="spin" color="#ffffff" height={18} width={18} />}
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>

              <div className='text-center mb-3'>
              <span className='link-text' onClick={() => history.replace('/login')}>
                GO BACK
              </span>
              </div>

            </div>
            <div className='col-lg-3'>&nbsp;</div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  )
};

export default VerifyEmailPage;
