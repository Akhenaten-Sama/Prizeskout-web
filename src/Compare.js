import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import Prices from './Prices';


export default function Compare({setOpenConverter,user}) {
const [results, setResults] = useState(null)

    useEffect(() => {
    }, []);

    return (
      <div style={{ width: "90%", overflowY: "auto", height: "500px" }}>
        <SearchComponent user={user} results={results} setResults={setResults} />
        <Prices user={user} setOpenConverter={setOpenConverter} result={results} />
      </div>
    );
}