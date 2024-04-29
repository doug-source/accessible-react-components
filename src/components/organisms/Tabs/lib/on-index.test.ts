import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { actArrow, pickEndId, pickHomeId, pickNextId, pickPreviousId } from '.';

function render(content: string | DocumentFragment) {
    const parent = document.createElement('div');
    parent.dataset.id = 'parent';
    parent.dataset.testid = 'parent';
    if (typeof content === 'string') {
        parent.innerHTML = content;
    } else {
        parent.append(content);
    }
    document.body.appendChild(parent);
}

function createThreeChildren() {
    const $first = document.createElement('button');
    const $medium = document.createElement('button');
    const $last = document.createElement('button');
    $first.id = 'first';
    $medium.id = 'medium';
    $last.id = 'last';
    return [$first, $medium, $last];
}

function createTwoChildren() {
    const $one = document.createElement('button');
    $one.id = 'one';
    const $two = document.createElement('button');
    $two.id = 'two';
    return [$one, $two];
}

describe('pickHomeId function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('returns id defined', () => {
        render(`
            <div id="first">First</div><div id="last">Last</div>
        `);
        const $el = screen.getByTestId('parent');
        expect(pickHomeId($el)).toBe('first');
    });
    test('returns id undefined', () => {
        render('');
        const $el = screen.getByTestId('parent');
        expect(pickHomeId($el)).toBeUndefined();
    });
});

describe('pickEndId function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('returns id defined', () => {
        render(`
            <div id="first">First</div><div id="last">Last</div>
        `);
        const $el = screen.getByTestId('parent');
        expect(pickEndId($el)).toBe('last');
    });
    test('returns id undefined', () => {
        render('');
        const $el = screen.getByTestId('parent');
        expect(pickEndId($el)).toBeUndefined();
    });
});

describe('pickNextId function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('returns defined id from the middle', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const $el = screen.getByTestId('parent');
        expect(pickNextId($el, $medium)).toBe('last');
    });
    test('returns defined id from the last', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const $el = screen.getByTestId('parent');
        expect(pickNextId($el, $last)).toBe('first');
    });
});

describe('pickPreviousId function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('returns defined id from the middle', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const $el = screen.getByTestId('parent');
        expect(pickPreviousId($el, $medium)).toBe('first');
    });
    test('returns defined id from the first', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const $el = screen.getByTestId('parent');
        expect(pickPreviousId($el, $first)).toBe('last');
    });
});

describe('actArrow function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('runs when children have no ids', () => {
        render(`
            <div>First</div><div>Last</div>
        `);
        const $el = screen.getByTestId('parent');
        const $active = document.activeElement;
        actArrow(false, pickNextId, $el);
        expect($active).toHaveFocus();
        actArrow(true, pickNextId, $el);
        expect($active).toHaveFocus();
    });
    test('runs when activeElement is not into parent', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const [$one, $two] = createTwoChildren();
        document.body.append($one, $two);
        const $el = screen.getByTestId('parent');
        actArrow(false, pickNextId, $el, $one);
        expect($first).not.toHaveFocus();
        actArrow(true, pickNextId, $el, $one);
        expect($first).not.toHaveFocus();
    });
    test('runs to the end correctly', () => {
        const df = document.createDocumentFragment();
        const [$first, $medium, $last] = createThreeChildren();
        df.append($first, $medium, $last);
        render(df);
        const $el = screen.getByTestId('parent');
        actArrow(false, pickNextId, $el, $medium);
        expect($last).toHaveFocus();

        const onClick = jest.fn();
        $last.onclick = onClick;
        actArrow(true, pickNextId, $el, $medium);
        expect(onClick).toHaveBeenCalled();
    });
});
