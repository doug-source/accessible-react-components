import { css, styled } from 'styled-components';
import { orientationAxis } from '../../../types/css-props';

type Tabs = {
    $orientation: orientationAxis;
};

export const Tabs_ = styled.div<Tabs>`
    display: flex;
    ${({ $orientation }) => css`
        flex-direction: ${$orientation === 'vertical' ? 'row' : 'column'};
    `}
`;
