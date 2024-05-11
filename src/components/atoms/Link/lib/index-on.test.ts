import { makeGoHandler, makeLinkKeyDownHandler } from '.';

const makeEvent = (key?: string) => {
    return {
        key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
    } as unknown as Parameters<ReturnType<typeof makeGoHandler>>[number];
};

const makeParams = () => {
    const locationMocked = {
        href: 'http://localhost/',
        replace(href: string) {
            this.href = href;
        },
    };
    const href = 'http://other-address.com';
    return { href, locationMocked } as unknown as {
        href: string;
        locationMocked: typeof window.location;
    };
};

describe('makeGoHandler function', () => {
    test('returns a function', () => {
        const { href, locationMocked } = makeParams();
        const outputFn = makeGoHandler(locationMocked, href);
        expect(typeof outputFn).toBe('function');
    });
    test('runs then event correctly', () => {
        const { href, locationMocked } = makeParams();
        const outputFn = makeGoHandler(locationMocked, href);
        expect(locationMocked.href).toBe('http://localhost/');
        const event = makeEvent();
        outputFn(event);
        expect(locationMocked.href).toBe(href);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
    });
});

describe('makeLinkKeyDownHandler function', () => {
    test('returns a function', () => {
        const { href, locationMocked } = makeParams();
        const goFn = makeGoHandler(locationMocked, href);
        const outputFn = makeLinkKeyDownHandler(goFn);
        expect(typeof outputFn).toBe('function');
    });
    test('runs then event correctly', () => {
        const { href, locationMocked } = makeParams();
        const goFn = makeGoHandler(locationMocked, href);
        expect(locationMocked.href).toBe('http://localhost/');
        const outputFn = makeLinkKeyDownHandler(goFn);
        let event = makeEvent('ArrowRight');
        outputFn(event);
        expect(locationMocked.href).toBe('http://localhost/');
        expect(event.stopPropagation).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();
        event = makeEvent('Enter');
        outputFn(event);
        expect(locationMocked.href).toBe(href);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
    });
});
