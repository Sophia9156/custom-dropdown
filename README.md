# React + Styled Components로 커스텀 Dropdown 컴포넌트 만들기

## About
맨날 Mui 사용하다가 Dropdown 때문에 큰 패키지를 매번 설치하는 나 자신에 한탄하여 이 컴포넌트를 만듭니다.
<br />
I made this Select Component because I lamented myself who installed Mui, which is pretty large package, only to make DropDown component.

## How to use

#### React
---
```javascript
import React, { useState } from "react";
import "./App.css";
import MenuItem from "./components/MenuItem";
import Select from "./components/Select";

const sampleData1 = ["blue", "red", "green", "yellow"];
const sampleData2 = [
  {
    id: 1,
    title: "blue",
    value: "#00F",
  },
  {
    id: 2,
    title: "red",
    value: "#F00",
  },
  {
    id: 3,
    title: "green",
    value: "#0F0",
  },
  {
    id: 4,
    title: "yellow",
    value: "#FF0",
  },
];

function App() {
  const [selected1, setSelected1] = useState<string>(sampleData1[0]);
  const [selected2, setSelected2] = useState<any>(sampleData2[0].value);

  return (
    <div className="App">
      <div className="height"></div>
      <div className="container">
        <Select value={selected1}>
          {sampleData1.map(item => (
            <MenuItem key={item} value={item} onSelect={(value) => setSelected1(value)}>{item}</MenuItem>
          ))}
        </Select>
        <Select value={selected2}>
          {sampleData2.map(item => (
            <MenuItem key={item.value} value={item.value} onSelect={(value) => setSelected2(value)}>{item.title}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default App;
```

#### Dependency
---
- React 18
- TypeScript
