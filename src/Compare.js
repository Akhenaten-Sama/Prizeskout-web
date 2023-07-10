import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import Prices from './Prices';


export default function Compare({setOpenConverter}) {
const [results, setResults] = useState(null)

    useEffect(() => {
    }, []);

    return (
      <div style={{ width: "90%", overflowY: "auto", height: "500px" }}>
        <SearchComponent results={results} setResults={setResults} />
        <Prices setOpenConverter={setOpenConverter} result={results} />
      </div>
    );
}