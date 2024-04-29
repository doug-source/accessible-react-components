export function pickHomeId(parentElement: HTMLElement) {
    return parentElement.children.item(0)?.id;
}

export function pickEndId(parentElement: HTMLElement) {
    return parentElement.children.item(parentElement.children.length - 1)?.id;
}

export function pickNextId(
    parentElement: HTMLElement,
    activeElement?: Element | null
) {
    if (activeElement?.nextElementSibling) {
        return activeElement.nextElementSibling.id;
    }
    return pickHomeId(parentElement);
}

export function pickPreviousId(
    parentElement: HTMLElement,
    activeElement?: Element | null
) {
    if (activeElement?.previousElementSibling) {
        return activeElement.previousElementSibling.id;
    }
    return pickEndId(parentElement);
}

export function actArrow(
    manual: boolean,
    picker: typeof pickNextId | typeof pickPreviousId,
    parentElement: Parameters<typeof picker>[0],
    activeElement?: Parameters<typeof picker>[1]
) {
    const id = picker(parentElement, activeElement);
    if (!id) {
        return;
    }
    const next = parentElement.querySelector<HTMLElement>(`#${id}`);
    if (!next) {
        return;
    }
    next.focus();
    if (manual) {
        next.click();
    }
}
