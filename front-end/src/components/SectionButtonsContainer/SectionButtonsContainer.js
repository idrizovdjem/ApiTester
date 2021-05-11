import { useState } from 'react';
import classes from './SectionButtonsContainer.module.css';

import SectionButton from './SectionButton/SectionButton';

const SectionButtonsContainer = () => {
    const [buttons, setButtons] = useState(
        [
            {
                text: 'Headers',
                isActive: true
            },
            {
                text: 'Body',
                isActive: false
            },
            {
                text: 'Request',
                isActive: false
            },
            {
                text: 'Response',
                isActive: false
            }
        ]
    );

    const changeActiveButtonHandler = (buttonText) => {
        setButtons(oldButtonsState => {
            const newButtons = oldButtonsState.map(button => {
                button.isActive = false;
                return button;
            });

            const selectedButton = newButtons.find(button => button.text === buttonText);
            selectedButton.isActive = true;
            return newButtons;
        });
    }

    return (
        <div className={classes.ButtonsLine}>
            {
                buttons.map(button => {
                    return (
                        <SectionButton
                            isActive={button.isActive}
                            select={changeActiveButtonHandler}
                            text={button.text}
                            key={button.text}
                        />
                    );
                })
            }
        </div>
    );
}

export default SectionButtonsContainer;