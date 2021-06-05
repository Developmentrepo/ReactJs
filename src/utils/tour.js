import React from "react";
export const tours = [
    {
        disableBeacon: true,
        target: '#btn_single_search',
        content: (<React.Fragment>
          <div style={{fontSize: '13px', textAlign: 'left'}}>
            Welcome to the Single Search Tab! This is where you can do individual searches by using the Last Name,
             Mailing Address and/or Phone Number/Email Address.
             <br/><br/>
            Searching with just the Mailing Address will still provide a result, but since we are tracking the individual,
            you will get a higher accuracy ratio if you include the name.
          </div>
        </React.Fragment>),
    },
    {
      disableBeacon: true,
      target: '#credits',
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          We provide credits for each new account. You can use the credits to do single searches.
           1 credit/record will be deducted for each result.
        </div>
      </React.Fragment>)
    },
    {
      disableBeacon: true,
      target: '#add_credit',
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          Click this link if you run out of credits or you would like to add more. <br/><br/>
          Note: credits stay in your account and is non-refundable. In the event that you cancel your subscription, the remaining credits will be forfeited.
        </div>
      </React.Fragment>)
    },
    {
      disableBeacon: true,
      target: '#btn_batch_search',
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          Welcome to Batch Search! You can upload your bulk list here with a file type of either CSV or Excel. <br/><br/>
          ETA during business hours will be within 30 mins to 2 hours depending on the file size. Any file submitted after business hours will be processed on the next business day.
        </div>
      </React.Fragment>)
    },
    {
      disableBeacon: true,
      target: '#btn_download_template',
      style: {
        width: '350px'
      },
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          Click here to download our template. We highly suggest that you use this template as we designed it to help you get the most out of your list.
        </div>
      </React.Fragment>)
    },
    {
      disableBeacon: true,
      target: '#btn_upload_list',
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          Click here to upload your bulk list for skip tracing. Once your file is processed, you will receive an invoice via email. After you paid, you will receive your output file.
        </div>
      </React.Fragment>)
    },
    {
      disableBeacon: true,
      target: '#btn_account_setting',
      content: (<React.Fragment>
        <div style={{fontSize: '13px', textAlign: 'left'}}>
          Welcome to Account Settings. In this section, you can update your email address, change/cancel your subscription and update your credit card information.<br/><br/>
          Note: We do not offer refunds under ANY circumstances. This simple refund policy enables us to offer our services at an affordable price without requiring a set up fee or long-term commitment. We suggest that you cancel your subscription 1-2 days before your Billing Date so you will not be billed.
        </div>
      </React.Fragment>)
    }
]
