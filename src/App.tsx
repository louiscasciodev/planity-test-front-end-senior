import React from 'react';
import './App.css';
//* Components
import Calendar from './calendar/components/Calendar';
//* Data
import eventsData from "./calendar/input.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar events={eventsData} />
      </header>
    </div>
  );
}

export default App;
