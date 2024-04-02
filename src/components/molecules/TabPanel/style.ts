import { css, styled } from 'styled-components';
import { CSS } from 'styled-components/dist/types';

type Props = {
    $padding: CSS.PropertyValue<CSS.PropertiesHyphen['padding']>;
};

export const TabPanel_ = styled.div<Props>`
    padding: ${({ $padding }) => {
        return css`
            ${$padding}
        `;
    }};
`;
