import { ComponentPropsWithRef, MutableRefObject, forwardRef } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import { makeKeyShiftFocusHandler } from '../../../../../lib/handlers/keyShiftFocus';
import { BtnDefault } from '../../../../atoms/BtnDefault';

type BtnProps = ComponentPropsWithRef<typeof BtnDefault> & {
    okBtnRef: MutableRefObject<HTMLButtonElement | null>;
    btnHandler: { year: () => boolean };
    iconClassName?: string;
    label: string;
};

export const BeforeYearBtn = forwardRef<HTMLButtonElement, BtnProps>(
    function BeforeYearBtnInner(
        { okBtnRef, btnHandler, children, label, ...remain }: BtnProps,
        ref
    ) {
        const onKeyDown = makeKeydownHandler([
            ['Enter', btnHandler.year],
            ['Tab', makeKeyShiftFocusHandler(okBtnRef, true)],
        ]);
        return (
            <BtnDefault
                {...remain}
                ref={ref}
                onClick={btnHandler.year}
                onKeyDown={onKeyDown}
            >
                {children}
                <span className="hidden">{label}</span>
            </BtnDefault>
        );
    }
);
