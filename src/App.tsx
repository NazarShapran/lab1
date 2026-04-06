import { useEffect, useState } from 'react'
import './App.css'

const SYMBOLS = "!@#$%^&*()_-+={}[]|:;<>,.?/~`"
const NUMBERS = '0123456789'
const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function App() {
  const [length, setLength] = useState(18)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let charset = LETTERS
    if (includeNumbers) charset += NUMBERS
    if (includeSymbols) charset += SYMBOLS

    if (!charset) {
      setPassword('Pick at least one type')
      return
    }

    let result = ''
    const max = charset.length
    for (let i = 0; i < length; i += 1) {
      const idx = Math.floor(Math.random() * max)
      result += charset[idx]
    }

    setPassword(result)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      alert('Password copied to clipboard!')
    } catch (error) {
      console.error("Copy failed. Select the password and copy manually.", error);
    }
  }

  return (
    <div className="app-root">
      <h1>Password Generator</h1>

      <div className="output">
        <input type="text" readOnly value={password} />
        <button onClick={copyToClipboard} disabled={!password}>Copy</button>
      </div>

      <div className="controls">
        <label>
          Password length
          <input
            type="number"
            min={8}
            max={64}
            value={length}
            onChange={(e) => {
              const value = Number(e.target.value)
              setLength(value > 0 ? value : 1)
            }}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include special symbols
        </label>
      </div>

      <button className="generate" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  )
}

export default App
