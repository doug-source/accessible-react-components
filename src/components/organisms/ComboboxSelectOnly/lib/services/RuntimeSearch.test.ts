import { waitFor } from '@testing-library/react';
import runtimeSearch from './RuntimeSearch';

describe('runtimeSearch instance', () => {
    test('has initial properties correctly', () => {
        expect(runtimeSearch.searchString).toBe('');
        expect(runtimeSearch.searchTimeout).toBe(-1);
    });
    test('runtimeSearch.allSameNeedle method runs correctly', () => {
        let output = runtimeSearch.allSameNeedle(['first', 'second', 'third']);
        expect(output).toBe(false);
        output = runtimeSearch.allSameNeedle(['same', 'same', 'same']);
        expect(output).toBe(true);
    });
    test('runtimeSearch.pickFirstMatch method runs correctly', () => {
        let output = runtimeSearch.pickFirstMatch([]);
        expect(typeof output).toBe('undefined');
        output = runtimeSearch.pickFirstMatch([], 'any');
        expect(typeof output).toBe('undefined');
        output = runtimeSearch.pickFirstMatch(
            ['one', 'TwoItem', 'three'],
            'TWO'
        );
        expect(output).toBe('TwoItem');
        output = runtimeSearch.pickFirstMatch(
            ['one', 'TwoItem', 'three'],
            'four'
        );
        expect(typeof output).toBe('undefined');
    });
    test('runtimeSearch.getIndexByLetter method runs correctly', () => {
        let output = runtimeSearch.getIndexByLetter(
            ['one', 'two', 'three', 'four', 'five'],
            'five',
            2
        );
        expect(output).toBe(4);
        output = runtimeSearch.getIndexByLetter(
            ['home', 'flower', 'five', 'rocket', 'rock'],
            'ffff',
            1
        );
        expect(output).toBe(1);
        output = runtimeSearch.getIndexByLetter(
            ['home', 'flower', 'five', 'rocket', 'rock'],
            'pencil',
            2
        );
        expect(output).toBe(-1);
    });
    test('runtimeSearch.getTemporalSearchString method runs correctly', async () => {
        let output = runtimeSearch.getTemporalSearchString('a');
        expect(output).toBe('a');
        expect(runtimeSearch.searchTimeout).not.toBe(-1);
        const timeout = runtimeSearch.searchTimeout;
        expect(runtimeSearch.searchString).toBe('a');
        output = runtimeSearch.getTemporalSearchString('b');
        expect(runtimeSearch.searchTimeout).not.toBe(timeout);
        expect(output).toBe('ab');
        expect(runtimeSearch.searchString).toBe('ab');
        await waitFor(() => {
            expect(runtimeSearch.searchString).toBe('');
        });
    });
    test('runtimeSearch.searchIndex method runs correctly', () => {
        let output = runtimeSearch.searchIndex(
            ['home', 'flower', 'five', 'rocket', 'rock'],
            'rocket',
            2
        );
        expect(output).toBe(3);
        output = runtimeSearch.searchIndex(
            ['home', 'flower', 'five', 'rocket', 'rock'],
            'frog',
            2
        );
        expect(output).toBe(-1);
        output = runtimeSearch.searchIndex(
            ['home', 'flower', 'five', 'rocket', 'rock'],
            'frog'
        );
        expect(output).toBe(-1);
    });
});
