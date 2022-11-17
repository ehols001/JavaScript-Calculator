import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculator from './Calculator';
import reportWebVitals from './reportWebVitals';

function Author() {
  return (
    <div className="author">
      <p>Designed and Developed By</p>
      <p>Evan Holster</p>
    </div>
  );
} 

function Links() {
  return (
    <div className="personal-links">
      <a id="gh-icon" href="https://github.com/ehols001/JavaScript-Calculator" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-github fa-xl"/>
      </a>
      <a id="li-icon" href="https://www.linkedin.com/in/evan-holster-b1b909239/" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-linkedin fa-xl"/>
      </a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
    <Author />
    <Links />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
