class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: "", todoItems: this.props.todoItems };
    this.cnt = 0;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    this.state.todoItems.push({
      id: this.cnt++,
      text: this.state.todo,
      // editingText: this.newTodoText,
      // isEditing: false,
    });

    localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    event.preventDefault();
  }

  render() {
    return (
      <div className="AddTodo">
        <h2>ToDo追加</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="追加" />
        </form>
      </div>
    );
  }
}

class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.todos = this.props.todoItems;
  }
  render() {
    return (
      <div className="TodoTable">
        <h2>ToDo一覧</h2>
        {/* <ul>
          {this.todos.map((todo, index) => {
            return todo.content;
          })}
        </ul> */}
        <ul>
          {this.todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddTodo todoItems={this.props.todoItems} />
        <TodoTable todoItems={this.props.todoItems} />
      </div>
    );
  }
}

const tempLocalStorageTodoItems = localStorage.getItem("todoItems");
const listItems = JSON.parse(tempLocalStorageTodoItems);

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp todoItems={listItems} />);
