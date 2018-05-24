import React from "react";

import MerchantSettings from "../components/MerchantSettings";

const DevPage = () => (
  <div className="page-container">
    <div className="m-b-100">
      <h1>Development Page for Christian </h1>
      <p>
        Import your "In-Progress" component here. When finished, import it on
        the index page.
      </p>
      <div className="mx-w-600">
        <MerchantSettings />
      </div>
    </div>
  </div>
);

export default DevPage;
