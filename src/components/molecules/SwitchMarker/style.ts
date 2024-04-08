import { css, styled } from 'styled-components';

type SwitchMarkerProps_ = {
    $borderWidth: string;
    $padding: string;
    $height: string;
};

export const SwitchMarker_ = styled.div<SwitchMarkerProps_>`
    display: flex;
    align-items: center;
    position: relative;
    border-width: ${({ $borderWidth }) => $borderWidth};
    border-style: solid;
    border-color: #000;
    /* border: 0.125rem solid black; */
    width: 2.5rem;
    border-radius: 0.75rem;
    /* padding: 0.125rem; */
    padding: ${({ $padding }) => $padding};
    ${({ $height, $padding, $borderWidth }) => {
        const newHeight = `calc(${$height} + ${$padding} * 2 + ${$borderWidth} * 2)`;
        return css`
            height: ${newHeight};
        `;
    }}
`;
