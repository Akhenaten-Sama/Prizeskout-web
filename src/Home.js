import "./App.css";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Converter from "./Converter";

const Home = ({user, openConverter, setOpenConverter})=>{

    return (
      <div className="App">
        <Compare
          user={user}
          openConverter={openConverter}
          setOpenConverter={setOpenConverter}
        />
        {user && <Converter user={user} setOpenConverter={setOpenConverter} />}
      </div>
    );
}

export default Home