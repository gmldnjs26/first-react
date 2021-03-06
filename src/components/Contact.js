import React from 'react'
import ContactInfo from './ContactInfo'
import ContactCreate from './ContactCreate'
import ContactDetails from './ContactDetails'
import update from 'react-addons-update';

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
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentWillMount() {
    const contactData = localStorage.contactData;
    if(contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
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
    });
  }
  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, { $push: [contact]})
    });
  }
  handleRemove() {
    console.log(this.state.selectedKey,"asd")
    if(this.state.selectedKey > 0) {
      this.setState({
        contactData: update(this.state.contactData, {
          $splice: [[this.state.selectedKey, 1]]
        }),
        selectedKey: -1
      });
    }
  }
  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone }
        }
      })
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
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate 
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}