import "./App.css";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Converter from "./Converter";
import { useNavigate } from "react-router-dom";

const Home = ({user, setOpenConverter})=>{
const navigate = useNavigate()

useEffect(() => {
  !user && navigate("/login");
});
    return(<div className="App">
  <Compare user={user} setOpenConverter={setOpenConverter} />
  <Converter user={user} setOpenConverter={setOpenConverter} />
</div>);
}

export default Home