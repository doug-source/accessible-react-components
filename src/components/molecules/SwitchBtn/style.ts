import { styled } from 'styled-components';

export const SwitchBtn_ = styled.button`
    color: currentColor;
    background-color: transparent;

    cursor: pointer;
    padding: 0.25rem; // 4px
    border-width: 0.125rem; // 2px
    border-style: solid;
    border-color: transparent;
    margin: 0;
    display: inline-flex;
    align-items: flex-end;

    &:focus,
    &:hover {
        border-color: #005a9c;
        outline: none;
    }
`;
