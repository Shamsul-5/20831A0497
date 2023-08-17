import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNumbers = async () => {
    const urls = inputUrls.split('\n').filter(url => url.trim() !== '');

    try {
      const response = await fetch(`http://localhost:8008/numbers?url=${urls.join('&url=')}`);
      if (!response.ok) {
        throw new Error('An error occurred while fetching data.');
      }
      const data = await response.json();
      setNumbers(data.numbers);
      setErrorMessage('');
    } catch (error) {
      setNumbers([]);
      setErrorMessage('An error occurred while fetching data.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Management App</h1>
        <textarea
          placeholder="Enter URLs, one per line"
          rows="5"
          value={inputUrls}
          onChange={e => setInputUrls(e.target.value)}
        ></textarea>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {numbers.length > 0 && (
          <div>
            <h2>Numbers:</h2>
            <ul>
              {numbers.map((number, index) => (
                <li key={index}>{number}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;