import React, { Fragment, useState } from "react";
import { faqData } from "../StaticData";
import "../styles/sellerPage/Faqs.css";
const Faqs = () => {
  return (
    <Fragment>
      <h1 className="faqHeading">People May Asked These Question </h1>
      <div className="faqupper">
        <div className="FaQMain">
          {faqData && faqData.map((data) => <Faq data={data} />)}
        </div>
      </div>
    </Fragment>
  );
};
const Faq = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="faqContainer">
      <div className="faqContainerChild">
        {open === false ? (
          <div className="faqicon" onClick={(e) => handleOpen()}>
            +
          </div>
        ) : (
          <div className="faqicon" onClick={(e) => handleOpen()}>
            -
          </div>
        )}
        <div className="fagQuestion">{data.question}</div>
      </div>
      {open && (
        <div>
          <div className="faqAnswer">{data.answer}</div>
        </div>
      )}
    </div>
  );
};
export default Faqs;
