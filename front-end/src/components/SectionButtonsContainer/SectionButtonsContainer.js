import { useState } from 'react';
import classes from './SectionButtonsContainer.module.css';

import SectionButton from './SectionButton/SectionButton';

const SectionButtonsContainer = (props) => {
    const [buttons, setButtons] = useState(
        [
            {
                text: 'Headers',
                isActive: false
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

    const selectedButton = buttons.find(button => button.text === props.currentTab);
    selectedButton.isActive = true;

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
                            selectTab={props.selectTab}
                        />
                    );
                })
            }
        </div>
    );
}

export default SectionButtonsContainer;