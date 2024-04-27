import { ComponentPropsWithoutRef } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import { BtnDefault } from '../../../../atoms/BtnDefault';

type BeforeMonthBtnProps = ComponentPropsWithoutRef<typeof BtnDefault> & {
    btnHandler: { month: () => boolean };
    label: string;
};

export const BeforeMonthBtn = ({
    btnHandler,
    children,
    label,
    ...remain
}: BeforeMonthBtnProps) => (
    <BtnDefault
        {...remain}
        onClick={btnHandler.month}
        onKeyDown={makeKeydownHandler([['Enter', btnHandler.month]])}
    >
        {children}
        <span className="hidden">{label}</span>
    </BtnDefault>
);
