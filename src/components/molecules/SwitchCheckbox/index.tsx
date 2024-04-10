import { ComponentPropsWithoutRef, useState } from 'react';
import { SwitchLabel } from '../../atoms/SwitchLabel';
import { SwitchBasicBox } from '../SwitchBasicBox';
import { SwitchMarker } from '../SwitchMarker';
import { Checkbox_ } from './style';

type SwitchCheckboxProps = {
    label?: ComponentPropsWithoutRef<typeof SwitchLabel>['label'];
    checked?: boolean;
};

export const SwitchCheckbox = ({
    label,
    checked = false,
}: SwitchCheckboxProps) => {
    const [checkedState, setCheckedState] = useState(checked);
    const [className, setClassName] = useState<'focus' | ''>('');
    return (
        <SwitchBasicBox
            as="label"
            className={className}
            onFocus={() => setClassName('focus')}
            onBlur={() => setClassName('')}
            focusable={false}
        >
            <SwitchLabel label={label} />

            <Checkbox_
                role="switch"
                onClick={() => setCheckedState(!checkedState)}
            />

            <SwitchMarker checked={checkedState} />
        </SwitchBasicBox>
    );
};
