class EditToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: props.todo, isEditing: false };
    this.handleEditingButton = this.handleEditingButton.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
  }

  handleEditingButton() {
    if (this.state.todo.text === "") return;

    if (this.state.isEditing) {
      this.props.onEditingToDo(this.state.todo);
    }
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleEditInputChange(event) {
    const tempToDo = { id: this.state.todo.id, text: event.target.value };
    this.setState({ todo: tempToDo });
  }

  render() {
    return (
      <tr>
        <td>
          {this.state.isEditing ? (
            <input
              type="text"
              value={this.state.todo.text}
              onChange={(event) => this.handleEditInputChange(event)}
            />
          ) : (
            this.state.todo.text
          )}
        </td>
        <td>
          <EditButton
            isEditing={this.state.isEditing}
            onEditingButton={this.handleEditingButton}
          />
        </td>
        <td>
          <DeleteButton
            todo={this.state.todo}
            onDeleteToDo={this.props.onDeleteToDo}
          />
        </td>
        <td>{this.state.todo.text === "" ? <ErrorText /> : ""}</td>
      </tr>
    );
  }
}
