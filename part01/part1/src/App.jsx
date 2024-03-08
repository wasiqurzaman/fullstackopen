import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
