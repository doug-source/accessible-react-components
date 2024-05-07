const runtimeSearch = {
    /**
     * Used by search
     */
    searchString: '',

    /**
     * Used by search's timeout
     */
    searchTimeout: -1,

    /**
     * Execute the index searching and manage the internal state
     *
     * @param list
     * @param needle
     * @param startIndex
     * @returns
     */
    searchIndex(list: string[], needle: string, startIndex = 0) {
        const searchIndex = this.getIndexByLetter(
            list,
            this.getTemporalSearchString(needle),
            startIndex
        );
        if (searchIndex >= 0) {
            return searchIndex;
        }
        window.clearTimeout(this.searchTimeout);
        this.searchString = '';
        return -1;
    },

    /**
     * Storage the repeated searches by string
     *
     * @param char
     * @returns The storaged string
     */
    getTemporalSearchString(char: string) {
        // reset typing timeout and start new timeout
        // this allows us to make multiple-letter matches, like a native select
        if (typeof this.searchTimeout === 'number') {
            window.clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = window.setTimeout(() => {
            this.searchString = '';
        }, 500);

        // add most recent letter to saved search string
        this.searchString += char;
        return this.searchString;
    },

    /**
     * Search on case-insensitive the array of string against an input string
     *
     * @param list array of haystacks
     * @param needle input string to search
     * @returns
     */
    pickFirstMatch(list: string[], needle?: string) {
        if (typeof needle === 'undefined') {
            return;
        }
        return list.find((haystack) =>
            haystack.toLowerCase().startsWith(needle.toLowerCase().trim())
        );
    },

    /**
     * Define if same needle is being repeated into list
     *
     * @param list
     * @returns The conditional
     */
    allSameNeedle(list: string[]) {
        const first = list.at(0);
        return list.every((needle) => needle === first);
    },

    /**
     *
     *
     * @param list
     * @param needle
     * @param startIndex
     * @returns
     */
    getIndexByLetter(list: string[], needle: string, startIndex: number) {
        const orderedList = [
            ...list.slice(startIndex),
            ...list.slice(0, startIndex),
        ];
        const firstMatch = this.pickFirstMatch(orderedList, needle);

        // first check if there is an exact match for the typed string
        if (typeof firstMatch !== 'undefined') {
            return list.findIndex((needle) => needle === firstMatch);
        }

        // if the same letter is being repeated
        // cycle through first-letter matches
        if (this.allSameNeedle(needle.split(''))) {
            const match = this.pickFirstMatch(orderedList, needle.at(0));
            return list.findIndex((haystack) => haystack === match);
        }
        // if no matches, return -1
        return -1;
    },
};

export default runtimeSearch;
