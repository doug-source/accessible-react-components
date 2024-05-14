import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { makeMenuKeydownHandler } from './makeMenuItemKeydown';

const makeEvent = (key: string, shiftKey = false) => {
    return {
        key,
        shiftKey,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLLIElement>;
};

const makeLiElement = (id: string | null = Date.now().toString()) => {
    return { id, focus: jest.fn() } as unknown as HTMLLIElement;
};

const makeButtonElement = (id = Date.now().toString()) => {
    return { id, focus: jest.fn() } as unknown as HTMLButtonElement;
};

const makeMutableRefObjectList = (list: (HTMLLIElement | null)[] = []) => {
    return renderHook(() => useRef<typeof list>(list)).result.current;
};

const makeMutableRefObjectBtn = ($button: HTMLButtonElement | null = null) => {
    return renderHook(() => useRef<typeof $button>($button)).result.current;
};

const makeitemList = (): Parameters<typeof makeMenuKeydownHandler>[0] => {
    return [
        ['one', 'kwerty', () => {}],
        ['two', 'wonder', () => {}],
        ['three', 'yellow', () => {}],
    ];
};

describe('makeMenuItemKeydownHandler function', () => {
    test('runs with output correctly', () => {
        const output = makeMenuKeydownHandler(
            makeitemList(),
            0,
            makeMutableRefObjectList(),
            () => {}, // setFocused
            () => {}, // setExpanded
            () => {}, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        expect(typeof output).toBe('function');
    });
    test('runs no ArrowDown/ArrowUp event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('a');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestActiveOptFn).not.toHaveBeenCalled();
    });
    test('runs with ArrowDown event + element without id correctly', () => {
        const liList = [makeLiElement(), makeLiElement(null), makeLiElement()];
        const mutableRefObjectList = makeMutableRefObjectList(liList);
        const jestFocusedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('ArrowDown');
        handler(evt);
        const newFocused = 1;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
        expect(jestActiveOptFn).toHaveBeenCalledWith('');
    });
    test('runs with ArrowDown event correctly', () => {
        const liList = [makeLiElement(), makeLiElement(), makeLiElement()];
        const mutableRefObjectList = makeMutableRefObjectList(liList);
        const jestFocusedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('ArrowDown');
        handler(evt);
        const newFocused = 1;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
        expect(jestActiveOptFn).toHaveBeenCalledWith(liList[1].id);
    });
    test('runs with ArrowUp event correctly', () => {
        const liList = [makeLiElement(), makeLiElement(), makeLiElement()];
        const mutableRefObjectList = makeMutableRefObjectList(liList);
        const jestFocusedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('ArrowUp');
        handler(evt);
        const newFocused = 0;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
        expect(jestActiveOptFn).toHaveBeenCalledWith(liList[0].id);
    });
    test('runs no Enter/Space event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const $button = makeButtonElement();
        const itemList = makeitemList();
        itemList[0][2] = jest.fn();
        const handler = makeMenuKeydownHandler(
            itemList,
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestActiveOptFn).not.toHaveBeenCalled();
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        const [, , jestCallbackFn] = itemList[0];
        expect(jestCallbackFn).not.toHaveBeenCalled();
    });
    test('runs with Enter event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOptFn = jest.fn();
        const $button = makeButtonElement();
        const itemList = makeitemList();
        itemList[0][2] = jest.fn();
        const handler = makeMenuKeydownHandler(
            itemList,
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOptFn, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Enter');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestActiveOptFn).toHaveBeenCalledWith(null);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        const [, , jestCallbackFn] = itemList[0];
        expect(jestCallbackFn).toHaveBeenCalledWith(evt);
    });
    test('runs with Space event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const $button = makeButtonElement();
        const itemList = makeitemList();
        itemList[0][2] = jest.fn();
        const handler = makeMenuKeydownHandler(
            itemList,
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent(' ');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestActiveOpt).toHaveBeenCalledWith(null);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        const [, , jestCallbackFn] = itemList[0];
        expect(jestCallbackFn).toHaveBeenCalledWith(evt);
    });
    test('runs no Escape/Shift+Tab event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect(jestActiveOpt).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Escape event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Escape');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestActiveOpt).toHaveBeenCalledWith(null);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs Shift+Tab event correctly', () => {
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestExpandedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab', true);
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestActiveOpt).toHaveBeenCalledWith(null);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no Home/PageUp event correctly', () => {
        const $firstLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            $firstLisItem,
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect($firstLisItem.focus).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestActiveOpt).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Home event + element without id correctly', () => {
        const $firstLisItem = makeLiElement(null);
        const mutableRefObjectList = makeMutableRefObjectList([
            $firstLisItem,
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Home');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith('');
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs Home event correctly', () => {
        const $firstLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            $firstLisItem,
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Home');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith($firstLisItem.id);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageUp event correctly', () => {
        const $firstLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            $firstLisItem,
            makeLiElement(),
            makeLiElement(),
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('PageUp');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith($firstLisItem.id);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no End/PageDown event correctly', () => {
        const $lastLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            $lastLisItem,
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect($lastLisItem.focus).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestActiveOpt).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs End event + element without id correctly', () => {
        const $lastLisItem = makeLiElement(null);
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            $lastLisItem,
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('End');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(jestActiveOpt).toHaveBeenCalledWith('');
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs End event correctly', () => {
        const $lastLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            $lastLisItem,
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('End');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(jestActiveOpt).toHaveBeenCalledWith($lastLisItem.id);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageDown event correctly', () => {
        const $lastLisItem = makeLiElement();
        const mutableRefObjectList = makeMutableRefObjectList([
            makeLiElement(),
            makeLiElement(),
            $lastLisItem,
        ]);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            1,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('PageDown');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(jestActiveOpt).toHaveBeenCalledWith($lastLisItem.id);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no {typing} event correctly', () => {
        const itemList = [makeLiElement(), makeLiElement(), makeLiElement()];
        const mutableRefObjectList = makeMutableRefObjectList(itemList);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestActiveOpt).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        itemList.forEach(($item) => expect($item.focus).not.toHaveBeenCalled());
    });
    test('runs {typing} event + element without id correctly', async () => {
        const itemList = [
            makeLiElement(null),
            makeLiElement(),
            makeLiElement(),
        ];
        const mutableRefObjectList = makeMutableRefObjectList(itemList);
        const jestFocusedFn = jest.fn();
        const jestActiveOpt = jest.fn();
        const handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('k');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith('');
    });
    test('runs {typing} event correctly', async () => {
        const itemList = [makeLiElement(), makeLiElement(), makeLiElement()];
        const mutableRefObjectList = makeMutableRefObjectList(itemList);
        let jestFocusedFn = jest.fn();
        let jestActiveOpt = jest.fn();
        let handler = makeMenuKeydownHandler(
            makeitemList(),
            0,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        let evt = makeEvent('k');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith(itemList[0].id);
        await new Promise((r) => setTimeout(r, 505));
        evt = makeEvent('w');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(1);
        expect(jestActiveOpt).toHaveBeenCalledWith(itemList[1].id);
        await new Promise((r) => setTimeout(r, 505));
        evt = makeEvent('y');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(jestActiveOpt).toHaveBeenCalledWith(itemList[2].id);
        await new Promise((r) => setTimeout(r, 505));
        jestFocusedFn = jest.fn();
        jestActiveOpt = jest.fn();
        handler = makeMenuKeydownHandler(
            makeitemList(),
            2,
            mutableRefObjectList,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            jestActiveOpt, // setActiveOpt
            makeMutableRefObjectBtn()
        );
        evt = makeEvent('k');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(jestActiveOpt).toHaveBeenCalledWith(itemList[0].id);
    });
});
