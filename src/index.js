import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculator from './Calculator';
import reportWebVitals from './reportWebVitals';

function Author() {
  return (
    <div className="author">
      <p>Designed and Developed By</p>
      <a href="https://www.linkedin.com/in/evan-holster-b1b909239/" target="_blank" rel="noreferrer">
        Evan Holster <i class="fa-brands fa-linkedin"/>
      </a>
    </div>
  );
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
    <Author />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
