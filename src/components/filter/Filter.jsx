import PropTypes from 'prop-types';
import { Label, FilterInput as Input } from '../contactForm/ContactForm.styled';

export const Filter = ({filter, onFilterContacts}) => {
    
    return <Label>
                Find contacts by name
        <Input value={filter} name="filter" onChange={onFilterContacts} />
            </Label>;
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterContacts: PropTypes.func.isRequired,
}