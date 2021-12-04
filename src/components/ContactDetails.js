import React from 'react'

export default class ContactDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      isEdit: false,
      name: '',
      phone: '',
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleToggle() {
    if(!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone,
      })
    } else {
      this.props.onEdit(this.state.name,this.state.phone)
    }
    
    // setState는 비동기함수 이다
    this.setState({
      isEdit: !this.state.isEdit
    })
  }
  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }
  render() {
    const details = (
      <div>
        <h2>Details</h2>
        { this.state.isEdit ? 
          (
          <div>
            <p>
              <input type="text" name="name" placeholder="name" value={this.state.name} onInput={this.handleChange} />
            </p>
            <p>
              <input type="text" name="phone" placeholder="phone" value={this.state.phone} onInput={this.handleChange}/>
            </p>
          </div>
          ) :
          (
          <div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.phone}</p>
          </div>
          )
        }
      
        <button onClick={this.handleToggle}> { this.state.isEdit ? 'OK' : 'Edit'}</button>
        <button onClick={this.props.onRemove}>Delete</button>
      </div>
    )
    const blank =(<div><h2>Not Selected</h2></div>)

    return(
      <div>
        {this.props.isSelected ? details : blank}
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  },
  onRemove: () => { console.error('onRemove not defined')}
}