import React from 'react'
import ContactInfo from './ContactInfo'

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      contactData: [
        {
          name: 'Abet1',
          phone: '011-1234-1234'
        },
        {
          name: 'Bbet2',
          phone: '012-1234-1234'
        },
        {
          name: 'Cbet2',
          phone: '013-1234-1234'
        },
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }


  render() {
    const mapToComponents = (data) => {
      return data
      .sort((a,b) => a.name > b.name)
      .filter((contact) => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1
      })
      .map((contact, i) => {
        return (<ContactInfo contact={contact} key={i} />);
      });
    };
    return (
      <div>
        <h1>Contacts</h1>
        <input name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange}/>
        <div>{mapToComponents(this.state.contactData)}</div>
      </div>
    )
  }
}