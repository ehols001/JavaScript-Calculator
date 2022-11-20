import React from 'react';
import './Calculator.css';
//import $ from 'jquery';

let formula_Idx = 0;
let lastInput = '';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      result: 0
    }
    this.appendNum = this.appendNum.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.calculate = this.calculate.bind(this);
    this.isOperator = this.isOperator.bind(this);
    this.getPrecendence = this.getPrecendence.bind(this);
    this.evaluateFormula = this.evaluateFormula.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }

  appendNum(event) {
    let tempFormula = [...this.state.formula];
    if(tempFormula[formula_Idx] === undefined) {
      if(event.target.value === '.') {
        tempFormula = [...this.state.formula, '0' + event.target.value];
      } else {
        tempFormula = [...this.state.formula, event.target.value];
      }
    }
    else if((tempFormula[formula_Idx] === '0' && event.target.value === '0') || (lastInput === '.' && event.target.value === '.')) {
      tempFormula = [...this.state.formula];
    }
    else {
      tempFormula[formula_Idx] = this.state.formula[formula_Idx] + event.target.value;
    }
    lastInput = event.target.value;
    this.setState({
      formula: tempFormula
    }, () => {
      this.setState({
        result: this.evaluateFormula()
      });
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
    if(this.isOperator(lastInput) && event.target.value === '-') {
      this.appendNum(event);
    } else {
      lastInput = event.target.value;
      this.setState({
        formula: [...this.state.formula, event.target.value]
      }, () => {
        //console.log("Formula: " + this.state.formula);
        //console.log("Formula Index: " + formula_Idx);
        formula_Idx += 2;
      });
    }
  }

  calculate = (numbers, operator) => {
    if(numbers.length < 2) {
      return;
    }
    const secondNum = parseFloat(numbers.pop());
    const firstNum = parseFloat(numbers.pop());
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

  isOperator = (op) => {
    return op === '+' || op === '-' || op === 'x' || op === '/';
  }

  getPrecendence = (op) => {
    if(op === '+' || op === '-')
      return 1;
    if(op === 'x' || op === '/')
      return 2;
      
    return 0;
  }

  evaluateFormula() {
    let operators = [];
    let numbers = [];

    for(let i = 0; i < this.state.formula.length; i++) {
      if(this.isOperator(this.state.formula[i])) {
        if(operators.length === 0 || (i !== 0 && this.isOperator(this.state.formula[i - 1]))
        || this.getPrecendence(this.state.formula[i]) > this.getPrecendence(operators[operators.length - 1])) {
          operators.push(this.state.formula[i]);
        } else {
          while(operators.length > 0 && this.getPrecendence(this.state.formula[i]) <= this.getPrecendence(operators[operators.length - 1])) {
            let lastOp = operators.pop();
            numbers.push(this.calculate(numbers, lastOp));
          }
          operators.push(this.state.formula[i]);
        }
      } else {
        numbers.push(this.state.formula[i]);
      }
    }

    while(operators.length > 0) {
      let nextOp = operators.pop();
      numbers.push(this.calculate(numbers, nextOp));
    }

    return numbers[0];
  }

  equals() {
    this.setState({
      result: this.evaluateFormula()
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
      formula: [],
      result: 0
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
