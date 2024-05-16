import { ComponentPropsWithoutRef } from 'react';
import { BtnDiv } from '../../atoms/BtnDiv';

type BtnPrintProps = ComponentPropsWithoutRef<'div'>;

export const BtnPrint = (props: BtnPrintProps) => (
    <BtnDiv
        {...props}
        onActivate={() => window.print()}
        onClick={() => window.print()}
    >
        Print Page
    </BtnDiv>
);
