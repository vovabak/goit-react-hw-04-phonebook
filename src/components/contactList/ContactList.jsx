// import { Component } from "react";
import PropTypes from 'prop-types';
import { ListItem } from "components/listItem";
import { List } from './ContactList.styled';

export const ContactList = ({filteredContacts, onDeleteContact}) => {

    return <List>
            { filteredContacts.length !==0 &&
                filteredContacts.map(contact =>
                    <ListItem
                        key={contact.id}
                        contact={contact}
                        onDeleteContact={() => onDeleteContact(contact.id)}
                    />)                
            }            
        </List>            
}

// export class ContactList extends Component {   
    
//     onClickHandle = (id) => {        
//         this.props.onDeleteContact(id)
//     }

//     render() {        
//         return this.props.filteredContacts.length > 0 &&
//             <List>
//                 {
//                 this.props.filteredContacts.map(contact =>
//                     <ListItem
//                         key={contact.id}
//                         contact={contact}
//                         onDeleteContact={() => this.onClickHandle(contact.id)}
//                     />)
//                 }
//             </List>            
//     }
// }

ContactList.propTypes = {
    filteredContacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,        
    }).isRequired).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}