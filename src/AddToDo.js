class AddToDo extends React.Component {
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
