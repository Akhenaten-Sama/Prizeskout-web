import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import Prices from './Prices';
import { useNavigate } from 'react-router-dom';

export default function Compare({setOpenConverter, openConverter,user}) {
const [results, setResults] = useState(null)
const navigate = useNavigate();
console.log(user);
useEffect(() => {
  !user && navigate("/login");
}, [user]);
   

    return (
      <div className="sub-1">
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
              marginLeft: "50px",
              marginBottom: "10px",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
          >
            Please login to use this service!
          </div>
        )}
        <SearchComponent
          user={user}
          results={results}
          setResults={setResults}
        />
        <Prices
          user={user}
          openConverter={openConverter}
          setOpenConverter={setOpenConverter}
          result={results}
        />
      </div>
    );
}