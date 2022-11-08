import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../contactList';
import { Filter } from '../filter';
import { ContactForm } from '../contactForm';
import { NotifyText } from './App.styled';
import { Container } from './App.styled';

const LS_KEY = 'MyContacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem(LS_KEY));
    
    if (contacts) {
      setContacts(contacts)
    }
  }, [])

  useEffect(() => {
    const savedContacts = JSON.stringify(contacts);    
    
      localStorage.setItem(LS_KEY, savedContacts);   
  }, [contacts])

  
  const filterContacts = (e) => {
    setFilter(e.currentTarget.value)
  }
  
  const addContact = (name, number) => {
    
    const normalizedName = name.toLowerCase().trim();

    if (contacts.find(contact => contact.name.toLowerCase().trim() === normalizedName)) {
      alert(`${name.trim()} is allready in contacts`)
      return
    }

    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    }
    
    setContacts(state => [contactToAdd, ...state])
  }

  const deleteContact = (contactToDeleteId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactToDeleteId)

    setContacts(updatedContacts)
  }
 
  const normalizedFilter = filter.toLowerCase().trim();
  const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  
    return <Container >
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={addContact}
      />
      <h2>Contacts</h2>
      <Filter
        filter={filter}
        onFilterContacts={filterContacts} />
      {contacts.length !==0 &&
        <ContactList          
          filteredContacts={filteredContacts}
          onDeleteContact={deleteContact}
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