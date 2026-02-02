export type StatusFilters = {
    upcoming: boolean;
    ongoing: boolean;
    closed: boolean;
    registered: boolean;
    bookmarked: boolean;
};

export type Categories = {
    open: boolean;
    university: boolean;
    school: boolean;
    other: boolean;
};

export type Modes = {
    physical: boolean;
    online: boolean;
    hybrid: boolean;
};

export interface FilterState {
    registeredRange: [number, number];
    keywords: string[];
    statusFilters: StatusFilters;
    categories: Categories;
    modes: Modes;
}
