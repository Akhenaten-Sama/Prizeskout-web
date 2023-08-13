import React, { useState, useEffect } from 'react';
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";

const { Search } = Input;
const sessionId  =uuidv4();

export default function SearchComponent({setResults, user}) {
  
    const onSearch = (value) => setResults({value,sessionId });
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