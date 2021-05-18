import classes from './Alert.module.css';

const Alert = ({ severity, message }) => {
    let backgroundColor;

    switch(severity) {
        case 'error': backgroundColor = '#ff6666'; break;
        case 'warning': backgroundColor = '#ffff33'; break;
        case 'info': backgroundColor = 'lightblue'; break;
        case 'success': backgroundColor = 'lightgreen'; break;
        default: backgroundColor = 'lightblue'; break;
    }

    return (
        <div style={{ backgroundColor }} className={classes.Alert}>
            {message}
        </div>
    );
}

export default Alert;