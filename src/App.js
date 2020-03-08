import React from "react";
import svolvaerGeita from "./images/svolvaer.png";
import "./app.less";

const menuItems = [
  { text: "Kommer du?", ref: null },
  { text: "Tale?", ref: null },
  { text: "Program", ref: null },
  { text: "Hvem er vi?", ref: null },
  { text: "Gaveønsker", ref: null },
  { text: "FAQ", ref: null }
];

function App() {
  return (
    <div className="app">
      <h1 className="header">Marie & Daniel</h1>
      <p className="date">19.09.2020</p>

      <img
        src={svolvaerGeita}
        alt="Daniel og Marie på svolværgeita"
        className="header-image"
      />

      <div className="menu-bar">
        {menuItems.map(item => (
          <span key={item.text} className="menu-item">
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
