import styled from 'styled-components';

export const DialogBox_ = styled.div<{ $show: boolean }>`
    z-index: 1;
    position: absolute;
    border: 3px solid rgb(30, 110, 230);
    padding: 0;
    display: ${({ $show }) => ($show ? 'block' : 'none')};
`;
