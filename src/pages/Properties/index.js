import React from "react";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";

const PropertiesPage = () => {

  return (
    <React.Fragment>
      <Container>
        <PageTitle
          title="PROPERTIES"
        />

        <div className="flex justify-center">
          <img src="resources/images/coming-soon.jpg" alt="" />
        </div>
      </Container>
    </React.Fragment>
  )
}

export default PropertiesPage;
