const todoList = ["hoge","foo"];
const listItems = todoList.map((todo) =>
  <li>{todo}</li>
);

function ToDoApp(props) {
  return (
    <div className="ToDoApp">
      <h1>ToDoアプリ</h1>

      <h2>ToDo追加</h2>
      <div className="AddTodo"></div>

      <h2>ToDo一覧</h2>

      <ul>{props.test}</ul>

      <div className="TodoTable">
        <div className="ToDoRaw"></div>
      </div>
    </div>
  );
}

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp todoItems={todoList.todoItems} test={listItems} />);

