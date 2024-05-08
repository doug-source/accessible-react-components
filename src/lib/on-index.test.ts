import {
    firstUpperCase,
    isBooleanishFalsy,
    makeBooleanHandle,
    parseBooleanish,
    swapIndex,
} from '.';

describe('isBooleanishFalsy function', () => {
    test('returns as output the true value correctly', () => {
        let input: boolean | 'true' = true;
        expect(isBooleanishFalsy(input)).toBe(false);
        input = 'true';
        expect(isBooleanishFalsy(input)).toBe(false);
    });
    test('returns as output the false value correctly', () => {
        let input: boolean | 'false' | undefined = false;
        expect(isBooleanishFalsy(input)).toBe(true);
        input = 'false';
        expect(isBooleanishFalsy(input)).toBe(true);
        input = undefined;
        expect(isBooleanishFalsy(input)).toBe(true);
    });
});

describe('makeBooleanHandle function', () => {
    test('returns the callback function', () => {
        const fn = makeBooleanHandle(false, () => {});
        expect(typeof fn).toBe('function');
    });
    test('calls the onChange parameter with opposite value before passed', () => {
        const onChange = jest.fn();
        const oldValue = false;
        makeBooleanHandle(oldValue, onChange)();
        expect(onChange).toHaveBeenCalledWith(!oldValue);
    });
});

describe('parseBooleanish function', () => {
    test('returns true output', () => {
        let output = parseBooleanish(true);
        expect(output).toBe(true);
        output = parseBooleanish('true');
        expect(output).toBe(true);
    });
    test('returns false output', () => {
        let output = parseBooleanish();
        expect(output).toBe(false);
        output = parseBooleanish(false);
        expect(output).toBe(false);
        output = parseBooleanish('false');
        expect(output).toBe(false);
    });
});

describe('firstUpperCase function', () => {
    test('returns output correctly', () => {
        let output = firstUpperCase('test-A');
        expect(output).toBe('Test-A');
        output = firstUpperCase('   test-B   ');
        expect(output).toBe('Test-B');
    });
});

describe('swapIndex function', () => {
    test('return output correctly', () => {
        const list = ['a', 'b', 'c'];
        let output = swapIndex(list, 0);
        expect(output).toBe(0);
        output = swapIndex(list, 1);
        expect(output).toBe(1);
        output = swapIndex(list, 2);
        expect(output).toBe(2);
        output = swapIndex(list, 3);
        expect(output).toBe(0);
        output = swapIndex(list, 4);
        expect(output).toBe(1);
        output = swapIndex(list, -1);
        expect(output).toBe(2);
        output = swapIndex(list, -2);
        expect(output).toBe(1);
        output = swapIndex(list, -3);
        expect(output).toBe(0);
    });
});
