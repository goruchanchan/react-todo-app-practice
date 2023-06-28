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
