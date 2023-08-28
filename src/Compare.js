import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import Prices from './Prices';


export default function Compare({setOpenConverter,user}) {
const [results, setResults] = useState(null)

    useEffect(() => {
    }, []);

    return (
      <div className='sub-1'>
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
          setOpenConverter={setOpenConverter}
          result={results}
        />
      </div>
    );
}