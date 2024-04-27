import { ComponentPropsWithoutRef } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import { BtnDefault } from '../../../../atoms/BtnDefault';

type AfterMonthBtnProps = ComponentPropsWithoutRef<typeof BtnDefault> & {
    btnHandler: { month: () => boolean };
    label: string;
};

export const AfterMonthBtn = ({
    btnHandler,
    children,
    label,
    ...remain
}: AfterMonthBtnProps) => {
    const onKeyDown = makeKeydownHandler([['Enter', btnHandler.month]]);
    return (
        <BtnDefault
            {...remain}
            onClick={btnHandler.month}
            onKeyDown={onKeyDown}
        >
            {children}
            <span className="hidden">{label}</span>
        </BtnDefault>
    );
};
