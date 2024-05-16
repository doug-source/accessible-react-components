import { ComponentPropsWithoutRef, useState } from 'react';
import { makeBooleanHandle } from '../../../lib';
import { BtnAnchor } from '../../atoms/BtnAnchor';

type BtnAudioProps = ComponentPropsWithoutRef<typeof BtnAnchor>;

export const BtnAudio = (props: BtnAudioProps) => {
    const [pressed, setPressed] = useState(false);
    const onActivate = makeBooleanHandle(pressed, setPressed);
    return (
        <BtnAnchor
            {...props}
            aria-pressed={pressed}
            onActivate={onActivate}
            onClick={onActivate}
        >
            Mute
        </BtnAnchor>
    );
};
