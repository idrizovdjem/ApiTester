import classes from './RequestPanel.module.css';
import { useContext } from "react";
import RequestContext from "../../../../contexts/RequestContext";
import requestsService from "../../../../services/requestsService";
import { v4 as uuid } from 'uuid';

const RequestPanel = (): JSX.Element => {
    const availableHeight: number = window.innerHeight - 160;
    const { request } = useContext(RequestContext);

    const mapLinesToElements = (): JSX.Element[] => {
        const requestLines: string[] = requestsService.getRequestForPreview(request);
        return requestLines.map((line: string): JSX.Element => {
            return (
                <div key={uuid()} className={classes.RequestLine}>
                    {line}
                </div>
            );
        });
    }

    return (
        <section style={{ height: `${availableHeight}px` }}>
            { mapLinesToElements() }
        </section>
    );
};

export default RequestPanel;