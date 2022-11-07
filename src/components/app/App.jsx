import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../contactList';
import { Filter } from '../filter';
import { ContactForm } from '../contactForm';
import { NotifyText } from './App.styled';
import { Container } from './App.styled';

const LS_KEY = 'MyContacts';

export class App extends Component {

  state = {
    contacts: [],
    filter: '',    
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LS_KEY));
    
    if (contacts) {
      this.setState({ contacts })
    }
  }

  componentDidUpdate(_, prevState) {
    const savedContacts = JSON.stringify(this.state.contacts);
    
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY, savedContacts);      
    }    
  }

  filterContacts = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    })
  }
  
  addContact = (name, number) => {
    
    const normalizedName = name.toLowerCase().trim();

    if (this.state.contacts.find(contact => contact.name.toLowerCase().trim() === normalizedName)) {
      alert(`${name.trim()} is allready in contacts`)
      return
    }

    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    }
    
    this.setState(prevState => {
      return { contacts: [contactToAdd, ...prevState.contacts] }
    })
  }

  deleteContact = (contactToDeleteId) => {
    const updatedContacts = this.state.contacts.filter(contact => contact.id !== contactToDeleteId)

    this.setState({
      contacts: updatedContacts,      
    })
  }
  
  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  
    return <Container >
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={this.addContact}
      />
      <h2>Contacts</h2>
      <Filter
        filter={filter}
        onFilterContacts={this.filterContacts} />
      {contacts.length !==0 &&
        <ContactList          
          filteredContacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      }
      { contacts.length !== 0 && filteredContacts.length === 0 &&
          <NotifyText>Sorry, there's no contact matching your querry</NotifyText>
      }
      {  contacts.length === 0 && normalizedFilter !== '' &&
          <NotifyText>There's no contact in your Phonebook</NotifyText>
      }
    </Container>
  };
}
