import React, { ComponentPropsWithoutRef } from 'react';
type SvgProps = ComponentPropsWithoutRef<'svg'>;

export default 'svg';

export const ReactComponent = (props: SvgProps) => {
    return React.createElement('svg', props, null);
};
