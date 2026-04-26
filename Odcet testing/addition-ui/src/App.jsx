import { useState } from 'react'
import './App.css'

function App() {
  const [numA, setNumA] = useState('')
  const [numB, setNumB] = useState('')
  const [result, setResult] = useState(null)
  const [animated, setAnimated] = useState(false)

  const handleCalculate = () => {
    if (numA === '' || numB === '') return
    const sum = parseFloat(numA) + parseFloat(numB)
    setResult(sum)
    setAnimated(false)
    // trigger re-animation
    setTimeout(() => setAnimated(true), 10)
  }

  const handleReset = () => {
    setNumA('')
    setNumB('')
    setResult(null)
    setAnimated(false)
  }

  return (
    <div className="page">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="card">
        <div className="card-header">
          <span className="icon">➕</span>
          <h1>Sravani</h1>
          <h1>Addition</h1>
          <p className="subtitle">Enter three numbers to add</p>
        </div>

        {/* Visual equation display */}
        <div className="equation-row">
          <div className="eq-box">
            <span className="eq-label">A</span>
            <span className="eq-value">{numA === '' ? '?' : numA}</span>
          </div>
          <span className="eq-op">+</span>
          <div className="eq-box">
            <span className="eq-label">B</span>
            <span className="eq-value">{numB === '' ? '?' : numB}</span>
          </div>
          <span className="eq-op">=</span>
          <div className={`eq-box result-box ${result !== null ? 'filled' : ''}`}>
            <span className="eq-label">Output</span>
            <span className="eq-value">{result !== null ? result : '?'}</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="inputs-row">
          <div className="input-group">
            <label htmlFor="numA">First Number (A)</label>
            <input
              id="numA"
              type="number"
              placeholder="e.g. 25"
              value={numA}
              onChange={e => { setNumA(e.target.value); setResult(null); setAnimated(false) }}
            />
          </div>

          <div className="plus-divider">+</div>

          <div className="input-group">
            <label htmlFor="numB">Second Number (B)</label>
            <input
              id="numB"
              type="number"
              placeholder="e.g. 17"
              value={numB}
              onChange={e => { setNumB(e.target.value); setResult(null); setAnimated(false) }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="btn-row">
          <button
            className="btn btn-primary"
            onClick={handleCalculate}
            disabled={numA === '' || numB === ''}
          >
            Calculate ✨
          </button>
          <button className="btn btn-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Result display */}
        {result !== null && (
          <div className={`result-banner ${animated ? 'pop-in' : ''}`}>
            <span className="result-label">🎉 Answer</span>
            <span className="result-number">{numA} + {numB} = <strong>{result}</strong></span>
          </div>
        )}

        {/* Step-by-step explanation */}
        {result !== null && (
          <div className={`steps-box ${animated ? 'slide-up' : ''}`}>
            <h3>📖 How it works</h3>
            <ol>
              <li>Take <strong>{numA}</strong> circles</li>
              <li>Take <strong>{numB}</strong> circles</li>
              <li>Count them all together: <strong>{result}</strong></li>
            </ol>
            
            {result <= 100 && (
              <div className="visualizer">
                <div className="dot-group">
                  {Array.from({ length: Number(numA) }).map((_, i) => (
                    <div key={`a-${i}`} className="dot dot-a" title={`Dot ${i+1}`} />
                  ))}
                </div>
                <div className="visual-plus">+</div>
                <div className="dot-group">
                  {Array.from({ length: Number(numB) }).map((_, i) => (
                    <div key={`b-${i}`} className="dot dot-b" title={`Dot ${i+1}`} />
                  ))}
                </div>
                <div className="visual-equals">=</div>
                <div className="dot-group result-dots">
                  {Array.from({ length: Number(result) }).map((_, i) => (
                    <div key={`r-${i}`} className={`dot ${i < Number(numA) ? 'dot-a' : 'dot-b'}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
