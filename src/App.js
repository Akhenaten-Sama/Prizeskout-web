import "./App.css";
import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Header from "./Header";
import ConverterModal from "./ConverterModal";
import { Button } from "antd";




function App() {
  const [openConverter,setOpenConverter] = useState(false)
  return (
    <div className="App">
     <Header />
<Compare />
<Button style={{width:"90%", marginTop:"5px"}} onClick={()=>setOpenConverter(true)} >
  Currency Converter
</Button>
<ConverterModal openConverter={openConverter} setOpenConverter={setOpenConverter} />
      
    </div>
  );
}

export default App;
