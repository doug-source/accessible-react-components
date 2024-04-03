import { css, styled } from 'styled-components';
import { CSS } from 'styled-components/dist/types';
import { orientationAxis } from '../../../types/css-props';

type Props_ = {
    $borderBottomWidth: CSS.PropertyValue<CSS.PropertiesHyphen['height']>;
    $orientation: orientationAxis;
};

export const TabList_ = styled.div<Props_>`
    display: flex;
    align-items: center;
    position: relative;
    padding: 1rem 0.5rem;
    ${({ $orientation }) => css`
        flex-direction: ${$orientation === 'vertical' ? 'column' : 'row'};
        justify-content: ${$orientation === 'vertical'
            ? 'space-evenly'
            : 'normal'};
        align-items: ${$orientation === 'vertical' ? 'flex-start' : 'center'};
    `}

    &::after {
        position: absolute;
        content: '';
        background: #ccc;
        top: auto;
        ${({ $borderBottomWidth, $orientation }) => css`
            display: ${$orientation === 'vertical' ? 'none' : 'block'};
            height: calc(${$borderBottomWidth} / 2);
            right: 0.5rem;
            left: 0.5rem;
            bottom: 1rem;
            transform: translateY(calc(-${$borderBottomWidth} * 0.25));
        `}
    }
`;
