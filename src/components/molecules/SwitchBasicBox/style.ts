import { css, styled } from 'styled-components';

type Props = {
    $focusable?: boolean;
};

export const SwitchBasicBox_ = styled.div<Props>`
    cursor: pointer;
    padding: 0.25rem; // 4px
    border-width: 0.125rem; // 2px
    border-style: solid;
    border-color: transparent;
    display: inline-flex;
    align-items: center;
    position: relative;
    border-radius: 0.3125rem;

    ${({ $focusable }) => {
        if ($focusable) {
            return css`
                &:focus,
                &:hover {
                    border-color: #005a9c;
                    outline: none;
                }
            `;
        }
        return css`
            &.focus {
                border-color: #005a9c;
                outline: none;
            }
        `;
    }}
`;
