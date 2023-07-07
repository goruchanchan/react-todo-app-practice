class ToDoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maxId: props.maxId };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.maxId !== this.props.maxId) {
      this.setState({
        maxId: this.props.maxId,
      });
    }
  }

  render() {
    return (
      <div className="to-do-table">
        <table>
          <tbody>
            {this.props.todoItems.map((todo) => (
              <EditToDo
                todo={todo}
                key={todo.id}
                onEditingToDo={this.props.onEditingToDo}
                onDeleteToDo={this.props.onDeleteToDo}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
