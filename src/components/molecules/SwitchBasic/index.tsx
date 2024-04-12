import { useState } from 'react';
import { makeBooleanHandle } from '../../../lib';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarker } from '../SwitchMarker';
import { makeKeydownHandler } from './lib';
import { SwitchBasic_ } from './style';

type SwitchBasicProps = {
    label?: string;
    className?: string;
    onChange?: (status: boolean) => void;
};

export const SwitchBasic = ({
    className,
    label,
    onChange,
}: SwitchBasicProps) => {
    const [ariaChecked, setAriaChecked] = useState<boolean>(false);
    const toogleAriaChecked = makeBooleanHandle(
        ariaChecked,
        (newAriaChecked) => {
            setAriaChecked(newAriaChecked);
            onChange && onChange(newAriaChecked);
        }
    );

    const keydownHandler = makeKeydownHandler(toogleAriaChecked);
    return (
        <SwitchBasic_
            className={className}
            role="switch"
            aria-checked={ariaChecked}
            tabIndex={0}
            onClick={() => toogleAriaChecked()}
            onKeyDown={keydownHandler}
        >
            <SwitchLabel label={label} />
            <SwitchMarker checked={ariaChecked} />
        </SwitchBasic_>
    );
};
