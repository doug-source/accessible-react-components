import { css, styled } from 'styled-components';
import { CSS } from 'styled-components/dist/types';

type Props_ = {
    $borderBottomWidth: CSS.PropertyValue<CSS.PropertiesHyphen['height']>;
};

export const TabList_ = styled.div<Props_>`
    display: flex;
    align-items: center;
    position: relative;
    padding: 1rem 0.5rem;

    &::after {
        position: absolute;
        content: '';
        background: #ccc;
        top: auto;
        ${({ $borderBottomWidth }) => css`
            height: calc(${$borderBottomWidth} / 2);
            right: 0.5rem;
            left: 0.5rem;
            bottom: 1rem;
            transform: translateY(calc(-${$borderBottomWidth} * 0.25));
        `}
    }
`;
