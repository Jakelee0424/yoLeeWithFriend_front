import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter 
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/config/configStore"; 
import App from './App';
import AppAdmin from './AppAdmin';
import reportWebVitals from './reportWebVitals';
import AdminMain from "./pages/admin/Main";

const HealthCheck = () => {
  // 여기에 건강 검사 로직을 추가합니다.
  return <div>Health Check OK</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <style>
      {`
      #root {
        margin: 0%;
      }
      `}
    </style>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> }></Route>
          <Route path="/admin/*" element={<AppAdmin />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
