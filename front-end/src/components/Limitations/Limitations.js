import classes from './Limitations.module.css';

const Limitations = ({ setCurrentPage }) => {
    return (
        <main className={classes.Limitations}>
            <h3 className={classes.CurrentLimitationsLabel}>Current Limitations:</h3>

            <ul className={classes.LimitationsContainer}>
                <li>You may need to allow AnyOrigin policy in your server if there is CORS error</li>
                <li>You may need to allow AnyHeader policy in your server if you send custom headers</li>
                <li>
                    For localhost there are certain headers that you can't alter
                    <a target='blank' className={classes.Link} href='https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name'>Forbidden Header Names</a>
                </li>
                <li>There is no cookie support</li>
                <li>There are only four supported methods</li>
            </ul>

            <button onClick={() => setCurrentPage('Main')} className={classes.GetBack}>Get Back</button>
        </main>
    );
}

export default Limitations;