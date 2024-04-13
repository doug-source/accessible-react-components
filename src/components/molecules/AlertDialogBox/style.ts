import { css, styled } from 'styled-components';

export const AlertDialogBox_ = styled.div<{ $show?: boolean }>`
    position: relative;
    ${({ $show }) => {
        return css`
            display: ${$show ? 'block' : 'none'};
        `;
    }}
`;
