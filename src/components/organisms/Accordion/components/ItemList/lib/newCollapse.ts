export const makeNewExpandedList = (
    headerId: string,
    expandedList: string[],
    unique: boolean,
    collapse: boolean
) => {
    if (!unique) {
        if (expandedList.includes(headerId)) {
            return expandedList.filter((id) => id !== headerId);
        }
        return [...expandedList, headerId];
    }
    if (!expandedList.includes(headerId)) {
        return [headerId];
    }
    if (collapse) {
        return [];
    }
    return expandedList;
};
