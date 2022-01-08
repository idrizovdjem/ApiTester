import classes from './SearchSection.module.css';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const methodOptions: any[] = [
    { label: 'GET' },
    { label: 'POST' },
    { label: 'PUT' },
    { label: 'DELETE' }
];

const SearchSection = (): JSX.Element => {
    return (
        <section className={classes.SearchSection}>
            <Dropdown 
                options={methodOptions} 
                className={classes.MethodDropdown} 
                placeholder='Request method'    
                value={{ label: 'GET' }}
            />

            <InputText 
                className={classes.InputText}
                placeholder='Server url'
                spellCheck={false}
            />

            <Button 
                className={classes.Button}
                label={'Send'}
            />
        </section>
    );
};

export default SearchSection;