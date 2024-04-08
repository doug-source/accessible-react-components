import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchLabel_ } from './style';

type SwitchLabelProps = {
    className?: string;
    label?: string;
} & ComponentPropsWithoutRef<'span'>;

export const SwitchLabel = ({
    className,
    label,
    ...remain
}: SwitchLabelProps) => {
    if (!label) {
        return null;
    }
    return (
        <SwitchLabel_ className={classNames('label', className)} {...remain}>
            {label}
        </SwitchLabel_>
    );
};
