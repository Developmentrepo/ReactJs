import React from 'react'
import SingleSearchForm from "./SingleSearchForm";
import SingleSearchResult from "./SingleSearchResult";
import CreditStateBar from "./CreditStateBar";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";
import SectionTitle from "../../components/Titles/SectionTitle";
import Divider from "../../components/Divider/Divider";

const SingleSearchPage = () => {

  return (
    <React.Fragment>
      <Container>
        <PageTitle
          title="SINGLE SEARCH"
          position="left"
        />

        <CreditStateBar />

        <div className="pt-2">
          <SectionTitle title="SEARCH PARAMETERS" />
          <SingleSearchForm />
        </div>

        <Divider className="my-5" />

        <div className="pt-4">
          <SectionTitle title="SEARCH RESULTS" />
          <div>
            <span className="font-bold">NOTE: </span>
            Optimal Call Window is in Eastern Time Zone
          </div>
          <SingleSearchResult />
        </div>
      </Container>
    </React.Fragment>
  )
};

export default SingleSearchPage;
