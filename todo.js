class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const tempLocalStorageTodoItems = localStorage.getItem("todoItems");

    if (tempLocalStorageTodoItems === null) {
      this.state = { todoItems: [], maxId: 0 };
    } else {
      this.state = {
        todoItems: JSON.parse(tempLocalStorageTodoItems),
        maxId: Number(localStorage.getItem("maxId")),
      };
    }
    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
    this.handleEditingTodo = this.handleEditingTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  handleAddNewTodo(newTodo) {
    const updatedTodoItems = [...this.state.todoItems, newTodo];
    const updatedMaxId = Number(newTodo.id) + 1;
    this.setState({ todoItems: updatedTodoItems, maxId: updatedMaxId });
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
    localStorage.setItem("maxId", updatedMaxId);
  }

  handleEditingTodo(targetTodo, editedText) {
    const updatedTodoItems = [...this.state.todoItems];

    if (editedText === "") {
      targetTodo.noEditingInput = true;
      this.setState({ todoItems: updatedTodoItems });
      return;
    }

    if (targetTodo.isEditing) targetTodo.text = editedText;

    targetTodo.isEditing = !targetTodo.isEditing;
    targetTodo.noEditingInput = false;

    this.setState({ todoItems: updatedTodoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
  }

  handleDeleteTodo(targetTodo) {
    const updatedTodoItems = this.state.todoItems.filter(
      (todo) => !_.isEqual(todo, targetTodo)
    );
    this.setState({ todoItems: updatedTodoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
  }

  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddNewTodo
          onAddNewTodo={this.handleAddNewTodo}
          maxId={this.state.maxId}
        />
        <TodoTable
          maxId={this.state.maxId}
          todoItems={this.state.todoItems}
          onEditingTodo={this.handleEditingTodo}
          onDeleteTodo={this.handleDeleteTodo}
        />
      </div>
    );
  }
}

class AddNewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: "", noInput: false };
    this.count = this.props.maxId;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value, noInput: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.todo === "") {
      this.setState({ noInput: true });
      return;
    }

    this.props.onAddNewTodo({
      id: this.count,
      text: this.state.todo,
      isEditing: false,
      noEditingInput: false,
    });

    this.setState({ todo: "", error: false });
    this.count++;
  }

  render() {
    let errorMessage = null;
    if (this.state.noInput) {
      errorMessage = (
        <div className="error">
          <p>ToDoを入力してください</p>
        </div>
      );
    }

    return (
      <div className="AddNewTodo">
        <h2>ToDo追加</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <input type="submit" value="追加" />
        </form>
        {errorMessage}
      </div>
    );
  }
}

class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maxId: props.maxId, editedTexts: props.todoItems };
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.maxId !== this.props.maxId) {
      this.setState({
        maxId: this.props.maxId,
        editedTexts: this.props.todoItems,
      });
    }
  }

  handleEditInputChange(event, index) {
    const tempEditedTexts = { ...this.state.editedTexts };
    tempEditedTexts[index].text = event.target.value;
    this.setState({ editedTexts: tempEditedTexts });
  }

  render() {
    return (
      <div className="TodoTable">
        <h2>ToDo一覧</h2>
        <table>
          <tbody>
            {this.props.todoItems.map((todo, index) => (
              <tr key={todo.id}>
                <td>
                  {todo.isEditing ? (
                    <input
                      type="text"
                      value={this.state.editedTexts[index].text}
                      onChange={(event) =>
                        this.handleEditInputChange(event, index)
                      }
                    />
                  ) : (
                    todo.text
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.props.onEditingTodo(
                        todo,
                        this.state.editedTexts[index].text
                      )
                    }
                  >
                    {todo.isEditing ? "確定" : "編集"}
                  </button>
                </td>
                <td>
                  <button onClick={() => this.props.onDeleteTodo(todo)}>
                    削除
                  </button>
                </td>
                <td>
                  {todo.noEditingInput ? (
                    <div className="error">ToDoを入力してください</div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const todoApp = ReactDOM.createRoot(document.getElementById("todoList"));
todoApp.render(<ToDoApp />);
