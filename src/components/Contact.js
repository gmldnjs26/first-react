import React from 'react'
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
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
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(e) {
    console.log(this)
    this.setState({
      keyword: e.target.value
    });
  }
  handleClick(key) {
    console.log(key)
    this.setState({
      selectedKey: key
    })
  }


  render() {
    const mapToComponents = (data) => {
      return data
      .sort((a,b) => a.name > b.name)
      .filter((contact) => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1
      })
      .map((contact, i) => {
        return (<ContactInfo onClick={() => this.handleClick(i)} contact={contact} key={i} />);
      });
    };
    return (
      <div>
        <h1>Contacts</h1>
        <input name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange}/>
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails 
          isSelected={this.state.selectedKey != -1 ? true : false} 
          contact={this.state.contactData[this.state.selectedKey]}
        />
      </div>
    )
  }
}