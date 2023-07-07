class DeleteButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onDeleteToDo(this.props.todo)}>
        削除
      </button>
    );
  }
}
