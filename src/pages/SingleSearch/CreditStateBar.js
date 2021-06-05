import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../index";

const CreditStateBar = () => {

  const [user, credits] = useSelector(state => [state.user, state.search.credits]);

  const remained_credits = credits ? credits.plan_total - credits.single_search : null;

  return (
    <>{user.role == 0 && (
      <div
        className="text-lg font-medium px-4 py-2 mb-2 rounded"
        style={{ border: '1px solid #ac0431'}}
      >
        {remained_credits != null ? (
          <div className="flex flex-wrap items-center">
            <div className='flex-grow'>
              YOUR CREDITS: <span className="inline-block">{remained_credits} RECORDS</span>
            </div>
            <button
              className='button fill-button small-button'
              onClick={() => history.push('/addcredit')}
            >ADD CREDITS</button>
          </div>
        ) : (
          <span className='label'>We are checking your subscription. Please wait ...</span>
        )}
      </div>
    )}</>
  )
};

export default CreditStateBar;
