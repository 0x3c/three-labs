import React, { Component } from "react";
import Example from "./example/1";
import Aircraft from "./example/Aircraft";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Aircraft />
      </div>
    );
  }
}

export default App;
