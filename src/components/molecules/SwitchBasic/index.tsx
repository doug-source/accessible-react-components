import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import { makeBooleanHandle } from '../../../lib';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarker } from '../SwitchMarker';
import styles from './SwitchBasic.module.scss';
import { makeKeydownHandler } from './lib';

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

    const keydownHandler = makeKeydownHandler(toogleAriaChecked);
    return (
        <div
            className={classNames(className, styles.switchBasic)}
            role="switch"
            aria-checked={ariaChecked}
            tabIndex={0}
            onClick={() => toogleAriaChecked()}
            onKeyDown={keydownHandler}
        >
            <SwitchLabel label={label} />
            <SwitchMarker checked={ariaChecked} />
        </div>
    );
};
