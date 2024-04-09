import { css, styled } from 'styled-components';
import { calcTranslateX } from './lib';

type Props = {
    $type: 'on' | 'off' | 'mixed';
};

export const SwitchCursorSvg_ = styled.rect<Props>`
    stroke: currentcolor;
    fill: currentcolor;
    fill-opacity: 1;

    width: 1rem;
    height: calc(100% - 0.25rem * 2);
    position: absolute;

    ${({ 'aria-hidden': ariaHidden, $type }) => css`
        display: ${!ariaHidden ? 'block' : 'none'};
        transform: translateX(${calcTranslateX($type)});
    `}
`;
