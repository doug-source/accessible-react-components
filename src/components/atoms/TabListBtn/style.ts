import { css, styled } from 'styled-components';
import { orientationAxis } from '../../../types/css-props';

type Props_ = {
    $orientation: orientationAxis;
};

export const TabListBtn_ = styled.button<Props_>`
    appearance: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    font-size: 0.85rem;
    ${({ $orientation }) => css`
        flex: ${$orientation === 'vertical' ? 0 : 1};
        text-align: ${$orientation === 'vertical' ? 'left' : 'center'};
    `}

    &:focus {
        outline: none;
    }
`;
