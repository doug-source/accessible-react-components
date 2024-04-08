import { css, styled } from 'styled-components';

type SwitchCursorProps_ = {
    $size: string;
    $parentPadding: string;
    $checked: boolean;
};

export const SwitchCursor_ = styled.div<SwitchCursorProps_>`
    height: ${({ $size }) => $size};
    width: ${({ $size }) => $size};
    border-radius: 100%;
    display: block;
    background: #000;
    position: absolute;
    ${({ $parentPadding, $size, $checked }) => {
        const leftValue = $checked
            ? `100% - ${$size} - ${$parentPadding}`
            : $parentPadding;
        return css`
            left: calc(${leftValue});
        `;
    }}
    transition: left;
    transition-duration: 0.2s;
    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;
