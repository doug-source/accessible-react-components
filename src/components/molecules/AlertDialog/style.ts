import { styled } from 'styled-components';
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
`;
