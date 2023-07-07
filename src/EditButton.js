class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: props.todo };
  }
  render() {
    return (
      <button onClick={this.props.onEditingButton}>
        {this.props.isEditing ? "確定" : "編集"}
      </button>
    );
  }
}
