class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const tempLocalStorageToDoItems = localStorage.getItem("todoItems");

    if (tempLocalStorageToDoItems === null) {
      this.state = { todoItems: [], maxId: 0 };
    } else {
      this.state = {
        todoItems: JSON.parse(tempLocalStorageToDoItems),
        maxId: Number(localStorage.getItem("maxId")),
      };
    }
    this.handleAddNewToDo = this.handleAddNewToDo.bind(this);
    this.handleEditingToDo = this.handleEditingToDo.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
  }

  handleAddNewToDo(newToDo) {
    const updatedToDoItems = [...this.state.todoItems, newToDo];
    const updatedMaxId = Number(newToDo.id) + 1;
    this.setState({ todoItems: updatedToDoItems, maxId: updatedMaxId });
    localStorage.setItem("todoItems", JSON.stringify(updatedToDoItems));
    localStorage.setItem("maxId", updatedMaxId);
  }

  handleEditingToDo(targetToDo, editedText) {
    const updatedToDoItems = [...this.state.todoItems];

    if (editedText === "") {
      targetToDo.noEditingInput = true;
      this.setState({ todoItems: updatedToDoItems });
      return;
    }

    if (targetToDo.isEditing) targetToDo.text = editedText;

    targetToDo.isEditing = !targetToDo.isEditing;
    targetToDo.noEditingInput = false;

    this.setState({ todoItems: updatedToDoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedToDoItems));
  }

  handleDeleteToDo(targetToDo) {
    const updatedToDoItems = this.state.todoItems.filter(
      (todo) => !_.isEqual(todo, targetToDo)
    );
    this.setState({ todoItems: updatedToDoItems });
    localStorage.setItem("todoItems", JSON.stringify(updatedToDoItems));
  }

  render() {
    return (
      <div className="ToDoApp">
        <h1>ToDoアプリ</h1>
        <AddNewToDo
          onAddNewToDo={this.handleAddNewToDo}
          maxId={this.state.maxId}
        />
        <ToDoTable
          maxId={this.state.maxId}
          todoItems={this.state.todoItems}
          onEditingToDo={this.handleEditingToDo}
          onDeleteToDo={this.handleDeleteToDo}
        />
      </div>
    );
  }
}

class AddNewToDo extends React.Component {
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

    this.props.onAddNewToDo({
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
      <div className="AddNewToDo">
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

class ToDoTable extends React.Component {
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
      <div className="ToDoTable">
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
                      this.props.onEditingToDo(
                        todo,
                        this.state.editedTexts[index].text
                      )
                    }
                  >
                    {todo.isEditing ? "確定" : "編集"}
                  </button>
                </td>
                <td>
                  <button onClick={() => this.props.onDeleteToDo(todo)}>
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
