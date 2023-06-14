import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import Prices from './Prices';


export default function Compare(second) {
const [results, setResults] = useState(null)

    useEffect(() => {
        
    }, []);

    return (
      <div style={{ width: "90%", }}>
        <SearchComponent setResults={setResults} />
      
        <Prices result={results} />
      </div>
    );
}