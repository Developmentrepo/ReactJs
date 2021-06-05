import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import Loading from "../../components/Loading";
import { history } from "../../index";
import PageTitle from "../../components/Titles/PageTitle";
import Container from "../../components/Container/Container";

const UpdateEmailPage = () => {

  const inputStyle = {
    maxWidth: "600px"
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onSubmit = (payload) => {
    dispatch({
      type: 'user/UPDATE_EMAIL',
      payload: payload
    })
  };

  return (
    <React.Fragment>
      <Container className="mt-32">
        <div className="flex flex-col items-center">
          <PageTitle title="UPDATE YOUR EMAIL" />
          <Form
            onSubmit={onSubmit}
            render={({
                       handleSubmit,
                       submitting,
                     }) => {
              return (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className='row'>
                    <div className='input-wrapper col-12'>
                      <Field
                        name="email"
                        placeholder="New Email Address"
                        component="input"
                        type="email"
                        required={true}
                        style={inputStyle}
                      />
                    </div>
                    <div className='input-wrapper col-12'>
                      <Field
                        name="password"
                        placeholder="Your Password"
                        component="input"
                        type="password"
                        required={true}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div className='input-wrapper my-5'>
                    <button
                      className="button form-button fill-button m-1"
                      type="submit"
                      disabled={submitting || user.loading}
                    >
                      UPDATE
                      <Loading type="spin" color="#ffffff" height={18} width={18} />
                    </button>
                  </div>
                </form>
              )
            }}
          />

          <div className='text-center'>
            <button onClick={() => history.goBack()}>GO BACK</button>
          </div>
        </div>  
      </Container>
    </React.Fragment>
  )
};

export default UpdateEmailPage;
