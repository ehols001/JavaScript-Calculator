import React from 'react';
import './Calculator.css';
//import $ from 'jquery';

let formula_Idx = 0;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [''],
      result: '0'
    }
    this.appendNum = this.appendNum.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.calculate = this.calculate.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }

  appendNum(event) {
    let tempFormula = [...this.state.formula];
    let updatedNum = '';
    if(tempFormula[formula_Idx] === undefined) {
      tempFormula = [...this.state.formula, event.target.value];
    }
    else {
      updatedNum = this.state.formula[formula_Idx] + event.target.value;
      tempFormula[formula_Idx] = updatedNum;
    }
    this.setState({
      formula: tempFormula
    }, () => {
      //console.log("Formula: " + this.state.formula);
      //console.log("Formula Index: " + formula_Idx);
    });

    if(this.state.formula.length > 2 && 
     (event.target.value === '+'
     || event.target.value === '-'
     || event.target.value === '/'
     || event.target.value === 'x')) { this.equals(); }
  }

  handleOperatorClick(event) {
    this.setState({
      formula: [...this.state.formula, event.target.value]
    }, () => {
      //console.log("Formula: " + this.state.formula);
      //console.log("Formula Index: " + formula_Idx);
      formula_Idx += 2;
    });
  }

  calculate = (num1, num2, operator) => {
    const firstNum = parseFloat(num1);
    const secondNum = parseFloat(num2);

    //console.log("First Num: " + firstNum);
    //console.log("Second Num: " + secondNum);

    if(operator === '+')
      return firstNum + secondNum;
    if(operator === '-')
      return firstNum - secondNum;
    if(operator === 'x')
      return firstNum * secondNum;
    if(operator === '/')
      return firstNum / secondNum;
  }

  equals() {
    this.setState({
      result: this.calculate(this.state.formula[formula_Idx - 2], this.state.formula[formula_Idx], this.state.formula[formula_Idx - 1]),
    }, () => {
      this.setState({
        formula: [this.state.result]
      });
      formula_Idx = 0;
      //console.log("Result: " + this.state.result);
    });
  }

  clear() {
    formula_Idx = 0;
    this.setState({
      formula: [''],
      result: '0'
    });
  }

  render() {
    return (
      <div className="calculator">
        <div id="display">
          <div className="formula-display">
            {this.state.formula}
          </div>
          <div className="results-display">
            {this.state.result}
          </div>
        </div>
        <div className="button-grid">
          {/* Row 1 */}
          <button className="wide-button" id="clear" value="AC" onClick={this.clear}>AC</button>
          <button id="divide" onClick={this.handleOperatorClick} value="/">/</button>
          <button id="multiply" onClick={this.handleOperatorClick} value="x">x</button>
          {/* Row 2 */}
          <button id="seven" onClick={this.appendNum} value="7">7</button>
          <button id="eight" onClick={this.appendNum} value="8">8</button>
          <button id="nine" onClick={this.appendNum} value="9">9</button>
          <button id="subtract" onClick={this.handleOperatorClick} value="-">-</button>
          {/* Row 3 */}
          <button id="four" onClick={this.appendNum} value="4">4</button>
          <button id="five" onClick={this.appendNum} value="5">5</button>
          <button id="six" onClick={this.appendNum} value="6">6</button>
          <button id="add" onClick={this.handleOperatorClick} value="+">+</button>
          {/* Row 4 */}
          <button id="one" onClick={this.appendNum} value="1">1</button>
          <button id="two" onClick={this.appendNum} value="2">2</button>
          <button id="three" onClick={this.appendNum} value="3">3</button>
          {/* Row 5 */}
          <button className="wide-button" onClick={this.appendNum} id="zero" value="0">0</button>
          <button id="decimal" onClick={this.appendNum} value=".">.</button>
          <button className="tall-button" id="equals" onClick={this.equals} value="=">=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
