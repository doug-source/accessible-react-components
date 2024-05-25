import { filterByStart } from '.';

describe('filterByStart function', () => {
    test('runs with output correctly', () => {
        const outputList = filterByStart('o', ['one', 'two']);
        expect(outputList).toMatchObject(['one']);
    });
});
