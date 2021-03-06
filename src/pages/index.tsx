import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
//always import this first before importing dynamic form
//to ensure all our functions are registered
import "meta/fnsRegistry";
//remove these after metaData comes from api
import myMetaData from "meta/metaData3";

import ThankYouPage from "./thankyou";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import DynamicForm from "components/dyanmicForm";

const Index = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="forms" element={<DynamicForm metaData={myMetaData} />} />
        <Route path="thankyou" element={<ThankYouPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default Index;
