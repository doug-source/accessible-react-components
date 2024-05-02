import { defineTypeClass, defineVisibilityByAriaHidden } from '.';
import styles from '../SwitchCursorSvg.module.scss';

describe('defineTypeClass function', () => {
    test('returns on output', () => {
        const output = defineTypeClass('on');
        expect(output).toBe(styles.on);
    });
    test('returns off output', () => {
        const output = defineTypeClass('off');
        expect(output).toBe(styles.off);
    });
});

describe('defineVisibility function', () => {
    test('returns hide output', () => {
        let output = defineVisibilityByAriaHidden(true);
        expect(output).toBe(styles.hide);
        output = defineVisibilityByAriaHidden('true');
        expect(output).toBe(styles.hide);
    });
    test('returns show output', () => {
        let output = defineVisibilityByAriaHidden();
        expect(output).toBe(styles.show);
        output = defineVisibilityByAriaHidden(false);
        expect(output).toBe(styles.show);
        output = defineVisibilityByAriaHidden('false');
        expect(output).toBe(styles.show);
    });
});
