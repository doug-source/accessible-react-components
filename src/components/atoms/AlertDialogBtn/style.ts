import { styled } from 'styled-components';

export const Button_ = styled.button`
    cursor: pointer;
    & ~ & {
        margin-left: 0.5rem;
    }
`;
