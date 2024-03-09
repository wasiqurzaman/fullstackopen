import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  const [value, setValue] = useState(0);

  const setToValue = (value) => {
    console.log("value now", value);
    setValue(value);
  };

  return (
    <div>
      {left}
      <Button text="left" handleClick={handleLeftClick} />
      <Button text="right" handleClick={handleRightClick} />
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
      <div>
        {value}
        <Button handleClick={() => setToValue(1000)} text="thousand" />
        <Button handleClick={() => setToValue(0)} text="reset" />
        <Button handleClick={() => setToValue(value + 1)} text="increment" />
      </div>
    </div>
  );
};

export default App;
