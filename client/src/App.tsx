import React, { useState, useEffect } from "react";
import CustomData from "./components/CustomData";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_INFO } from "./graphql";
import "./App.css";

const App = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTION_INFO);

  return (
    <>
      <div className="grid  lg:mt-0 mt-0 lg:px-20 justify-center grid-cols-1 lg:grid-cols-1 gap-2x lg:gap-2x mb-10 lg:p-0 p-4x  w-1/10">
        <div className="mt-60">
          {loading && (
            <div className="centraliser">
              {" "}
              <ClipLoader color={"#6c2bd9"} loading={true} size={105} />
            </div>
          )}
          {!loading && <CustomData loading={loading} data={data} />}
        </div>
      </div>
    </>
  );
};

export default App;
