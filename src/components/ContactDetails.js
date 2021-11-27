import React from 'react'

export default class ContactDetails extends React.Component {
  render() {

    const details = (
      <div>
        <h2>Details</h2>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
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
  }
}