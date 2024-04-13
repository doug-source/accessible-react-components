import { ComponentPropsWithoutRef } from 'react';
import { Button_ } from './style';

type DialogBtnProps = ComponentPropsWithoutRef<'button'>;

export const DialogBtn = (props: DialogBtnProps) => (
    <Button_ {...props} type="button" />
);
