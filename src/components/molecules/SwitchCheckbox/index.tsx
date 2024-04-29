import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import boxStyles from '../../atoms/SwitchBasicBox/SwitchBasicBox.module.scss';
import { SwitchCursor } from '../../atoms/SwitchCursor';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchMarker } from '../../atoms/SwitchMarker';
import styles from './SwitchCheckbox.module.scss';

type SwitchCheckboxProps = {
    label?: ComponentPropsWithoutRef<typeof SwitchLabel>['label'];
    checked?: boolean;
};

export const SwitchCheckbox = ({
    label,
    checked = false,
}: SwitchCheckboxProps) => {
    const [checkedState, setCheckedState] = useState(checked);
    const [className, setClassName] = useState<string>('');
    return (
        <label
            className={classNames(className, boxStyles.switchBasicBox)}
            onFocus={() => setClassName(styles.focused)}
            onBlur={() => setClassName('')}
        >
            <SwitchLabel label={label} />

            <input
                type="checkbox"
                role="switch"
                className={styles.switchCheckbox}
                onClick={() => setCheckedState(!checkedState)}
            />

            <SwitchMarker>
                <SwitchCursor checked={checkedState} />
            </SwitchMarker>
        </label>
    );
};
