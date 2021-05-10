import classes from './SectionButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const SectionButton = (props) => {
    const buttonClass = props.isActive ? classes.ActiveButton : classes.SectionButton;

    const selectButtonHandler = () => {
        props.select(props.text);
    }

    return (
        <button onClick={selectButtonHandler} className={buttonClass}>
            {props.text}
            {
                props.isActive ? 
                    <FontAwesomeIcon icon={faSortDown} className={classes.ActiveIcon} /> 
                    : null
            }
        </button>
    );
}

export default SectionButton;