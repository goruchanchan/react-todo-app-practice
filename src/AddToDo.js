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
    });

    this.setState({ todo: "" });
    this.count++;
  }

  render() {
    return (
      <div className="add-to-do">
        <h2>ToDo追加</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <input type="submit" value="追加" />
        </form>
        {this.state.noInput ? <ErrorText /> : ""}
      </div>
    );
  }
}
