import React from "react";

import FoodCategorySelectors from "../components/FoodCategorySelectors";
import ValidationSample from "../components/ValidationSample";
import MerchantHours from "../components/MerchantHours";
import MerchantOrderSettings from "../components/MerchantOrderSettings";

import MapZone from "../components/MapZone";

const DevPage = () => (
  <div className="page-container">
    <div className="m-b-100">
      <h1>Development Page for Christian </h1>
      <p>
        Import your "In-Progress" component here. When finished, import it on
        the index page.
      </p>
      <div>
        <MapZone />
      </div>
    </div>
  </div>
);

export default DevPage;
