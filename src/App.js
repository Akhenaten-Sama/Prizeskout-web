/*global chrome*/
import "./App.css";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Header from "./Header";
import ConverterModal from "./ConverterModal";
import { Button } from "antd";

function App() {
  const [user, setUser] = useState(null);
  const [openConverter, setOpenConverter] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get(["user"]).then((result) => {
      setUser(result.user);
    });
  }, []);

  console.log(user);
  return (
    <div className="App">
      <Header setUser={setUser} user={user} />
      {user ? (
        <div
          style={{
            alignSelf: "flex-start",
            marginLeft: "20px",
            marginBottom: "10px",
            fontSize: "16px",
            fontFamily: "inherit",
          }}
        >
          Welcome {user.firstName}!
        </div>
      ) : (
        <div
          style={{
            alignSelf: "flex-start",
            marginLeft: "20px",
            marginBottom: "10px",
            fontSize: "16px",
            fontFamily: "inherit",
          }}
        >
          Please Login to use this service!
        </div>
      )}
      <Compare user={user} setOpenConverter={setOpenConverter} />
      <ConverterModal
        user={user}
        openConverter={openConverter}
        setOpenConverter={setOpenConverter}
      />
    </div>
  );
}

export default App;
