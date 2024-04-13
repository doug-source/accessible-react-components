import { ComponentPropsWithoutRef } from 'react';
import { CloseIcon_ } from './style';

type CloseIconProps = ComponentPropsWithoutRef<'svg'>;

export const CloseIcon = (props: CloseIconProps) => <CloseIcon_ {...props} />;
