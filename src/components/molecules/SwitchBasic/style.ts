import { styled } from 'styled-components';

export const SwitchBasic_ = styled.div`
    cursor: pointer;
    padding: 0.25rem; // 4px
    border-width: 0.125rem; // 2px
    border-style: solid;
    border-color: transparent;
    display: inline-flex;
    align-items: center;

    &:focus,
    &:hover {
        border-color: #005a9c;
        outline: none;
    }
`;
