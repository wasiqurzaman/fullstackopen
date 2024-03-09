import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 - 1 * bad) / all;
  const positive = (good / all) * 100;
  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give geedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
