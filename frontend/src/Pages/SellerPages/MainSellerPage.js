import React, { Fragment, useState } from "react";
import Becomeseller from "./BecomeSeller";
import "../styles/sellerPage/MainSellerPage.css";
import SellerMenu from "./SellerMenu";
import DashBoard from "./Dashboard";
import Profile from "./Profile";
import CreateProduct from "./CreateProduct";
import Orders from "./Orders";
import TrackOrders from "./TrackOrders";
import ShopFeedBack from "./ShopFeedBack";
import Inbox from "./Inbox";
const MainSellerPage = () => {
  const [active, setActive] = useState(1);
  return (
    <Fragment>
      <div className="sellerpage">
        <div className="div2">
          <SellerMenu active={active} setActive={setActive} />
        </div>
        <div className="div3">
          {active === 1 && <DashBoard />}
          {active === 2 && <Profile />}
          {active === 3 && <CreateProduct />}
          {active === 4 && <Orders />}
          {active === 5 && <TrackOrders />}
          {active === 6 && <ShopFeedBack />}
          {active === 7 && <Inbox />}
        </div>
      </div>
    </Fragment>
  );
};

export default MainSellerPage;
