/*global chrome*/
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Header from "./Header";
import ConverterModal from "./Modals/ConverterModal";
import { Button } from "antd";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Converter from "./Converter";
import Home from "./Home";
import LoginModal from "./Modals/LoginModal";
import SubscriptionModal from "./Modals/SubsriptionsModal";

function App() {
  const [user, setUser] = useState(null);
  const [openConverter, setOpenConverter] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log(user);
  return (
    <BrowserRouter>
      {/* <Header setUser={setUser} user={user} /> */}
      <ChakraProvider>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} setOpenConverter={setOpenConverter} />}
          />
          <Route path="/login" element={<LoginModal setUser={setUser} />} />

          <Route
            path="/subscriptions"
            element={
              // <ChakraProvider>
              <SubscriptionModal user={user} />
              // </ChakraProvider>
            }
          />
          {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
