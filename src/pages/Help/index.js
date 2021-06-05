import React, { useState } from 'react'
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";
import clsx from "clsx";
import "./index.scss"

const HelpPage = () => {

  const [accordion, setAccordion] = useState(null);

  const helps = [
    {
      header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing. Quisque consequat, nunc at dignissim eleifend, dui sem iaculis nisl, sed hendrerit turpis odio idleo. Nulla nulla urna."
    },
    {
      header: "Ipsum dolor sit amet, consectetur?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing. Quisque consequat, nunc at dignissim eleifend, dui sem iaculis nisl, sed hendrerit turpis odio idleo. Nulla nulla urna."
    },
    {
      header: "Dolor sit amet, consectetur adipiscing lorem ipsum?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing. Quisque consequat, nunc at dignissim eleifend, dui sem iaculis nisl, sed hendrerit turpis odio idleo. Nulla nulla urna."
    },
    {
      header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing. Quisque consequat, nunc at dignissim eleifend, dui sem iaculis nisl, sed hendrerit turpis odio idleo. Nulla nulla urna."
    }
  ]

  const AccordionItem = (props) => {
    const { show, index, header, content, setAccordion, className } = props;

    return (
      <div className={clsx("w-full accordion", show && 'open', className)}>
        <div className="header" onClick={() => setAccordion(show ? null : index)}>
          {header}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Container>
        <PageTitle
          title="KNOWLEDGE BASE"
        />

        <div className="flex justify-center">
          <img src="resources/images/coming-soon.jpg" alt="" />
        </div>

        {/*<div className="w-full flex flex-wrap">*/}
        {/*  <div className="w-full md:w-1/2 flex-shrink-0 flex-grow-0 mt-8 pr-4">*/}
        {/*    {*/}
        {/*      helps.map((help, index) => {*/}
        {/*        return <AccordionItem*/}
        {/*          key={index}*/}
        {/*          show={accordion === index}*/}
        {/*          index={index}*/}
        {/*          header={help.header}*/}
        {/*          content={help.content}*/}
        {/*          setAccordion={setAccordion}*/}
        {/*          className="mb-4"*/}
        {/*        />*/}
        {/*      })*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full md:w-1/2 text-center my-4 shadow-lg p-4 pt-0">*/}
        {/*    <PageTitle title="Do You Still Have A Question?" />*/}
        {/*    <p className="text-center text-2xl font-bold py-2">We'd love to hear from you too!</p>*/}
        {/*    <p className="text-center text-xl py-2">For all inquiries please contact us and fill out the provided*/}
        {/*      form and include all contact information. One of our representative will contact you shortly.</p>*/}
        {/*    <div className="mt-3">*/}
        {/*      <button className="form-button fill-button m-1">CONTACT US</button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Container>
    </React.Fragment>
  )
};

export default HelpPage;
