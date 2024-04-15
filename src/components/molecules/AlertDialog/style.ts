import { styled } from 'styled-components';
import { AlertDialogDesc_ } from '../../atoms/AlertDialogDesc/style';
import { CloseIcon_ } from '../../atoms/CloseIcon/style';
import { Heading_ } from '../../atoms/Heading/style';
import { AlertDialogBox_ } from '../AlertDialogBox/style';
import { Backdrop } from '../Backdrop';

export const Backdrop_ = styled(Backdrop)`
    ${AlertDialogBox_} {
        width: 50%;
        height: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        bottom: auto;
        left: 50%;
        border: 1px solid #000;
        border-radius: 0.5rem;
        background-color: #ddd;
        display: flex;
        flex-direction: column;
    }
    ${CloseIcon_} {
        position: absolute;
        top: 0;
        right: 0;
        bottom: auto;
        left: auto;
        cursor: pointer;
        z-index: 1;
        margin: 0.125rem;
    }
    ${Heading_} {
        margin: 1.25rem 0;
    }
    ${AlertDialogDesc_} {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
