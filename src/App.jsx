import React from 'react';
import Chat from './components/Chat';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi Agent Config</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;