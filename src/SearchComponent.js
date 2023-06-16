import React, { useState, useEffect } from 'react';
import { Input } from "antd";
const { Search } = Input;


export default function SearchComponent({setResults}) {
    const onSearch = (value) => setResults(value);
    return (
      <div >
        <Search
          placeholder="input search term"
          enterButton="Search"
          size="large"
          style={{ color: "#f06821" }}
          onSearch={onSearch}
        />
      </div>
    );
}