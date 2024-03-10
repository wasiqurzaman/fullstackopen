const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((course) => (
        <Part key={course.id} part={course} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      Number of exercises{" "}
      {course.parts.reduce((acc, part) => acc + part.exercises, 0)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
