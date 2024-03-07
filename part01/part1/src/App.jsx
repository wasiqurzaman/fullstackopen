const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old.
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by{" "}
      <a href="https://github.com/wasiqurzaman">Wasiqur Zaman</a>
    </div>
  );
};

const App = () => {
  // console.log("Hello form component");
  // const now = new Date();
  // const a = 10;
  // const b = 20;
  // console.log(a + b);

  const name = "Peter";
  const age = 10;

  const friends = [
    { name: "Maya", age: 12 },
    { name: "Peter", age: 8 },
  ];

  const boys = ["Peter", "James"];

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" age={26 + 10} />
      <Hello name={name} age={age} />
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>
      <p>{boys}</p>
      <Footer />
    </div>
  );
};

export default App;
