import { ComponentPropsWithRef, MutableRefObject, forwardRef } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import { makeKeyShiftFocusHandler } from '../../../../../lib/handlers/keyShiftFocus';
import { DialogBtn } from '../../../../atoms/DialogBtn';

type OkBtnProps = ComponentPropsWithRef<typeof DialogBtn> & {
    beforeYearBtnRef: MutableRefObject<HTMLButtonElement | null>;
    onSelect: () => boolean;
};

export const OkBtn = forwardRef<HTMLButtonElement, OkBtnProps>(
    function OkBtnInner(
        { beforeYearBtnRef, onSelect, children, ...remain }: OkBtnProps,
        ref
    ) {
        const onKeyDown = makeKeydownHandler([
            ['Tab', makeKeyShiftFocusHandler(beforeYearBtnRef)],
            ['Enter', onSelect],
        ]);
        return (
            <DialogBtn {...remain} ref={ref} onKeyDown={onKeyDown}>
                {children}
            </DialogBtn>
        );
    }
);
