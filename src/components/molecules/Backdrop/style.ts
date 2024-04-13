import { css, styled } from 'styled-components';

export const Backdrop_ = styled.div<{ $show: boolean }>`
    position: fixed;
    overflow-y: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    ${({ $show }) => {
        return css`
            display: ${$show ? 'block' : 'none'};
        `;
    }}
`;
