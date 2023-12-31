import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider,} from "antd";
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const defaultData = {
  borderRadius: 6,
  colorPrimary: "#f06821",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: defaultData
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
