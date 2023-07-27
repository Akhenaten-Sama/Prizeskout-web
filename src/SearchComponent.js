import React, { useState, useEffect } from 'react';
import { Input } from "antd";
const { Search } = Input;


export default function SearchComponent({setResults, user}) {
  
    const onSearch = (value) => setResults(value);
    return (
      <div >
        <Search
          placeholder="input search term"
          enterButton="Search"
          size="large"
          disabled={!user}
          style={{ color:user? "#f06821":"white" }}
          onSearch={onSearch}
        />
      </div>
    );
}