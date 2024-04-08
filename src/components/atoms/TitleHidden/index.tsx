import { ComponentPropsWithoutRef } from 'react';
import { TitleHidden_ } from './style';

type StyledProps = ComponentPropsWithoutRef<typeof TitleHidden_>;

export const TitleHidden = (props: StyledProps) => {
    return <TitleHidden_ aria-hidden="true" {...props} />;
};
