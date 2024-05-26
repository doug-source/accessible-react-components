import { defineItems, filterByStart } from '.';

describe('filterByStart function', () => {
    test('runs with output correctly', () => {
        const outputList = filterByStart(['one', 'two'], 'o');
        expect(outputList).toMatchObject(['one']);
    });
});

describe('defineItems function', () => {
    test('filters correctly', () => {
        const haystack = ['good', 'gone', 'last'];
        let output = defineItems('none', haystack, 'go');
        expect(output).toMatchObject(haystack);
        output = defineItems('list', haystack, 'go');
        expect(output).toMatchObject(['good', 'gone']);
        output = defineItems('both', haystack, 'go');
        expect(output).toMatchObject(['good', 'gone']);
    });
});
