import { useRef, useState } from 'react';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarker } from '../SwitchMarker';
import { makeKeydownHandler } from './lib';
import { useToogleAriaChecked } from './lib/hooks';
import { Switch_ } from './style';

type SwitchProps = {
    label?: string;
    className?: string;
    onChange?: (status: boolean) => void;
};

export const Switch = ({ className, label, onChange }: SwitchProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [ariaChecked, setAriaChecked] = useState<boolean>(false);
    const toogleAriaChecked = useToogleAriaChecked(
        ref,
        ariaChecked,
        setAriaChecked,
        onChange
    );
    const keydownHandler = makeKeydownHandler(toogleAriaChecked);
    return (
        <Switch_
            ref={ref}
            className={className}
            role="switch"
            aria-checked={ariaChecked}
            tabIndex={0}
            onClick={() => toogleAriaChecked()}
            onKeyDown={keydownHandler}
        >
            <SwitchLabel label={label} />
            <SwitchMarker checked={ariaChecked} />
        </Switch_>
    );
};
