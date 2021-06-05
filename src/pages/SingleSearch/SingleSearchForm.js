import React from 'react'
import { Field, Form } from "react-final-form";
import '../../styles/form.style.scss'
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const SingleSearchForm = () => {

  const [user, search] = useSelector(state => [state.user, state.search]);
  const dispatch = useDispatch();

  const disable = user.role > 0 ? false : (search.credits ? search.credits.plan_total - search.credits.single_search === 0 : true);

  const onSubmit = async payload => {
    dispatch({
      type: 'search/SINGLE_SEARCH',
      payload: {
        ...payload,
        PhoneNumbers: '',
        Email: '',
      }
    })
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            {/*<div className='input-wrapper xl:w-4/12 lg:w-4/12 md:w-6/12 sm:w-full w-full'>*/}
            {/*  <Field name="PhoneNumbers" component="input" disabled={disable}*/}
            {/*         placeholder="Phone Numbers(up to 3 number separated by a comma)" />*/}
            {/*</div>*/}

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="LastName" component="input" placeholder="Last Name"  disabled={disable} />
            </div>

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="FirstName" component="input" placeholder="First Name" disabled={disable} />
            </div>

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="Address" component="input" placeholder="Address"  disabled={disable} />
            </div>

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="City" component="input" placeholder="City"  disabled={disable} />
            </div>

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="State" component="input" placeholder="State"  disabled={disable} />
            </div>

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <Field name="Zip" component="input" placeholder="Zip Code" disabled={disable} />
            </div>

            {/*<div className='input-wrapper md:w-6/12 sm:w-full w-full'>*/}
            {/*  <Field name="Email" component="input" placeholder="Email" disabled={disable} />*/}
            {/*</div>*/}

            <div className='input-wrapper md:w-1/2 sm:w-full w-full'>
              <button className='button submit-button fill-button mr-auto' type="submit" disabled={search.loading || disable} >
                SEARCH
              </button>
            </div>
          </div>
        </form>
      )}
    />
  )
};

export default SingleSearchForm;
