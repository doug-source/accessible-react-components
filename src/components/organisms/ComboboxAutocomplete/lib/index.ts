export const filterByStart = (value: string, list: string[]) => {
    return list.filter((item) =>
        item.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
    );
};
