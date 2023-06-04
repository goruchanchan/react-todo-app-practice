function ToDoApp(props) {
  return (
    <div className="ToDoApp">
      <h1>ToDoアプリ</h1>

      <h2>ToDo追加</h2>
      <div className="AddTodo"></div>

      <h2>ToDo一覧</h2>

      <ul>{props.todoItems}</ul>

      <div className="TodoTable">
        <div className="ToDoRaw"></div>
      </div>
    </div>
  );
}

const listItems = ["hoge","foo"].map((todo) =>
  <li>{todo}</li>
);

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp todoItems={listItems} />);

