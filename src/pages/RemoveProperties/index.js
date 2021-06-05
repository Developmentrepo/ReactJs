import React from "react";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";

const RemovePropertiesPage = () => {

  return (
    <React.Fragment>
      <Container>
        <PageTitle
          title="CLEAN UP YOUR DATABASE"
          subtitle="Upload your file to label non-performing numbers"
        />

        <div className="flex justify-center">
          <img src="resources/images/coming-soon.jpg" alt="" />
        </div>
      </Container>
    </React.Fragment>
  )
}

export default RemovePropertiesPage;