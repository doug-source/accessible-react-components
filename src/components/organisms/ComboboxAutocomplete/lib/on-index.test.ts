import { defineItems } from '.';

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
