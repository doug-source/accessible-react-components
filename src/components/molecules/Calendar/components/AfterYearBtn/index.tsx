import { ComponentPropsWithoutRef } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import { BtnDefault } from '../../../../atoms/BtnDefault';

type AfterYearBtnProps = ComponentPropsWithoutRef<typeof BtnDefault> & {
    btnHandler: { year: () => boolean };
    label: string;
};

export const AfterYearBtn = ({
    children,
    btnHandler,
    label,
    ...remain
}: AfterYearBtnProps) => {
    const onKeyDown = makeKeydownHandler([['Enter', btnHandler.year]]);
    return (
        <BtnDefault {...remain} onClick={btnHandler.year} onKeyDown={onKeyDown}>
            {children}
            <span className="hidden">{label}</span>
        </BtnDefault>
    );
};
