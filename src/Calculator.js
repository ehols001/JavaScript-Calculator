import React from 'react';
import './Calculator.css';

function Calculator() {
  const formula = "600 x 50";
  const result = 30000;
  return (
    <div className="calculator">
      <div id="display">
        <div className="formula-display">
          {formula}
        </div>
        <div className="results-display">
          {result}
        </div>
      </div>
      <div className="button-grid">
        {/* Row 1 */}
        <button className="wide-button" id="clear" value="AC">AC</button>
        <button id="divide" value="/">/</button>
        <button id="multiply" value="x">x</button>
        {/* Row 2 */}
        <button id="seven" value="7">7</button>
        <button id="eight" value="8">8</button>
        <button id="nine" value="9">9</button>
        <button id="subtract" value="-">-</button>
        {/* Row 3 */}
        <button id="four" value="4">4</button>
        <button id="five" value="5">5</button>
        <button id="six" value="6">6</button>
        <button id="add" value="+">+</button>
        {/* Row 4 */}
        <button id="one" value="1">1</button>
        <button id="two" value="2">2</button>
        <button id="three" value="3">3</button>
        {/* Row 5 */}
        <button className="wide-button" id="zero" value="0">0</button>
        <button id="decimal" value=".">.</button>
        <button className="tall-button" id="equals" value="=">=</button>
      </div>
    </div>
  );
}

export default Calculator;
