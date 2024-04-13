import { ComponentPropsWithoutRef } from 'react';

type DialogBtnProps = ComponentPropsWithoutRef<'button'>;

export const DialogBtn = (props: DialogBtnProps) => (
    <button {...props} type="button" />
);
