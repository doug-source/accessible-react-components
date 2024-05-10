import { ComponentPropsWithoutRef, useState } from 'react';
import { makeBooleanHandle } from '../../../lib';
import { SwitchBasicBox } from '../../atoms/SwitchBasicBox';
import { SwitchCursor } from '../../atoms/SwitchCursor';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarker } from '../../atoms/SwitchMarker';
import { makeSwitchBasicKeydownHandler } from './handlers/makeSwitchBasicKeydown';

type StyleProps = ComponentPropsWithoutRef<'div'>;

type SwitchBasicProps = Omit<StyleProps, 'onChange'> & {
    label?: string;
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

    return (
        <SwitchBasicBox
            className={className}
            role="switch"
            aria-checked={ariaChecked}
            tabIndex={0}
            onClick={() => toogleAriaChecked()}
            onKeyDown={makeSwitchBasicKeydownHandler(toogleAriaChecked)}
        >
            <SwitchLabel label={label} />
            <SwitchMarker>
                <SwitchCursor checked={ariaChecked} />
            </SwitchMarker>
        </SwitchBasicBox>
    );
};
