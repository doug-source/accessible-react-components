type GoEvent = {
    key?: string;
    preventDefault(): void;
    stopPropagation(): void;
};

type MakeGoEventFn = (
    location: typeof window.location,
    href: string
) => (evt: GoEvent) => void;

export const makeGoHandler: MakeGoEventFn = (location, href) => {
    return (evt) => {
        location.replace(href);
        evt.preventDefault();
        evt.stopPropagation();
    };
};

export const makeKeyDownHandler = (
    goHandler: ReturnType<typeof makeGoHandler>
) => {
    return (evt: GoEvent) => evt.key === 'Enter' && goHandler(evt);
};
