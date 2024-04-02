import { css, styled } from 'styled-components';
import { CSS } from 'styled-components/dist/types';

export const TabListBtnText_ = styled.span<{
    $paddingBlock: CSS.PropertyValue<CSS.PropertiesHyphen['padding']>;
    $borderBottomWidth: CSS.PropertyValue<
        CSS.PropertiesHyphen['border-bottom-width']
    >;
    $selected?: boolean;
}>`
    display: inline-block;
    width: 100%;
    text-transform: capitalize;
    position: relative;
    z-index: 1;
    ${({ $paddingBlock, $borderBottomWidth, $selected = false }) => {
        return css`
            border-bottom-width: ${$borderBottomWidth};
            border-bottom-style: solid;
            border-bottom-color: ${$selected ? '#000' : 'transparent'};
            font-weight: ${$selected ? '700' : 'normal'};
            padding: ${$paddingBlock} 0.75rem;
        `;
    }}
    *:focus > &::after {
        content: '';
        position: absolute;
        top: 0.0625rem;
        right: 0.0625rem;
        bottom: 0.0625rem;
        left: 0.0625rem;
        border: 0.125rem;
        border-style: solid;
        border-color: blue;
        border-radius: 0.5rem;
    }
`;
