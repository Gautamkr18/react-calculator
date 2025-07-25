import React, { useState } from 'react';
import { evaluate, sqrt, pi, e } from 'mathjs';
import './Calculator.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput('');
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const result = evaluate(input);
      const newEntry = { expr: input, result: result.toString() };
      setHistory([newEntry, ...history]);
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  const scientificFunctions = [
    { label: '√', value: 'sqrt(' },
    { label: 'xʸ', value: '^' },
    { label: 'π', value: pi.toString() },
    { label: 'e', value: e.toString() },
    { label: 'sin', value: 'sin(' },
    { label: 'cos', value: 'cos(' },
    { label: 'tan', value: 'tan(' },
    { label: 'log', value: 'log(' }
  ];

  const brackets = ['(', ')'];

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <input type="text" value={input} readOnly />

      <div className="buttons">
        {/* Number & Operator Buttons */}
        {[
          7, 8, 9, '/',
          4, 5, 6, '*',
          1, 2, 3, '-',
          0, '.', '+', '='
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => btn === '=' ? calculate() : handleClick(btn.toString())}
            className={['+', '-', '*', '/', '^'].includes(btn) ? 'operator' : ''}
          >
            {btn}
          </button>
        ))}

        {/* Bracket Buttons */}
        {brackets.map((br, i) => (
          <button key={`br-${i}`} onClick={() => handleClick(br)}>
            {br}
          </button>
        ))}

        {/* Scientific Buttons */}
        {scientificFunctions.map((func, i) => (
          <button key={i} onClick={() => handleClick(func.value)} className="operator">
            {func.label}
          </button>
        ))}

        {/* Clear and Backspace Buttons */}
        <button className="clear" onClick={clearInput}>C</button>
        <button className="clear" onClick={backspace}>←</button>
      </div>

      {/* History Section */}
      <div className="history">
        <h3>History</h3>
        {history.length === 0 ? (
          <p>No calculations yet.</p>
        ) : (
          <ul>
            {history.map((item, i) => (
              <li key={i}>
                <span>{item.expr} = {item.result}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
