import "./App.css";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Header from "./Header";
import { Button } from "antd";
import Navbar from "./Navbar";
import Converter from "./Converter";

const Home = ({user, setOpenConverter})=>{
    return(<div className="App">
  <Compare user={user} setOpenConverter={setOpenConverter} />
  <Converter user={user} setOpenConverter={setOpenConverter} />
</div>);
}

export default Home