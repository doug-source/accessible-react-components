import '@testing-library/jest-dom';
import { makeNewExpandedList } from './newCollapse';

describe('makeNewExpanded function', () => {
    test('runs correctly', () => {
        let expandedList = ['foo'];
        let output = makeNewExpandedList('bar', expandedList, true, true);
        expect(output).toMatchObject(['bar']);
        output = makeNewExpandedList('foo', expandedList, true, true);
        expect(output).toMatchObject([]);
        output = makeNewExpandedList('foo', expandedList, true, false);
        expect(output).toMatchObject(['foo']);
        expandedList = ['foo', 'baz'];
        output = makeNewExpandedList('foo', expandedList, false, true);
        expect(output).toMatchObject(['baz']);
        output = makeNewExpandedList('guz', expandedList, false, true);
        expect(output).toMatchObject(['foo', 'baz', 'guz']);
    });
});
