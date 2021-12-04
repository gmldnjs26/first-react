import React from "react";

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      phone:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress(this)
  }
  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }
  handleKeyPress(e) {
    if(e.charCode === 13) {
      this.handleClick()
    }
  }
  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    }
    this.props.onCreate(contact);
    this.setState({
      name: '',
      phone: ''
    })
    this.nameInput.focus();
  }
  render() {
    return(
      <div>
        <h2>Create Component</h2>
        <p>
          <input ref={(ref) => { this.nameInput = ref }} type="text" name="name" placeholder="name" value={this.state.name} onInput={this.handleChange} />
          <input type="text" name="phone" placeholder="phone" value={this.state.phone} onInput={this.handleChange} onKeyPress={this.handleKeyPress}/>
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    )
  }
}

// ContactCreate.propsType = {
//   onCreate: React.PropTypes.func
// }