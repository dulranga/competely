import type { FilterState } from './types';

/**
 * Filter competitions based on all active filter criteria
 */
export function filterCompetitions(competitions: any[], filters: FilterState) {
    return competitions.filter((comp) => {
        // Registered count filter
        const count = (comp as any).registeredCount || 0;
        if (count < filters.registeredRange[0] || count > filters.registeredRange[1]) {
            return false;
        }

        // Status filter - only apply if not all filters are checked
        const statusFilterValues = Object.values(filters.statusFilters);
        const allStatusChecked = statusFilterValues.every(v => v);
        if (!allStatusChecked) {
            const status = (comp.status || '').toLowerCase();
            const hasMatchingStatus = Object.entries(filters.statusFilters).some(([key, value]) => {
                if (!value) return false;
                return status === key.toLowerCase() || 
                       (key === 'ongoing' && status === 'open') ||
                       (key === 'upcoming' && status === 'upcoming') ||
                       (key === 'closed' && (status === 'closed' || status === 'ended'));
            });
            if (!hasMatchingStatus) {
                return false;
            }
        }

        // Category filter - only apply if not all filters are checked
        const categoryFilterValues = Object.values(filters.categories);
        const allCategoriesChecked = categoryFilterValues.every(v => v);
        if (!allCategoriesChecked) {
            const category = (comp.category || '').toLowerCase();
            const hasMatchingCategory = Object.entries(filters.categories).some(([key, value]) => {
                if (!value) return false;
                return category.includes(key.toLowerCase()) || (key === 'other' && category === '');
            });
            if (!hasMatchingCategory) {
                return false;
            }
        }

        // Keywords filter (search in title, tagline, organizer)
        if (filters.keywords.length > 0) {
            const searchText = `${comp.title || ''} ${comp.tagline || ''} ${comp.organizerName || ''}`.toLowerCase();
            const hasKeyword = filters.keywords.some(keyword => 
                searchText.includes(keyword.toLowerCase())
            );
            if (!hasKeyword) return false;
        }

        return true;
    });
}

/**
 * Initial filter state with all filters set to permissive defaults
 */
export const DEFAULT_FILTERS: FilterState = {
    registeredRange: [0, 1000],
    keywords: [],
    statusFilters: {
        upcoming: true,
        ongoing: true,
        closed: true,
        registered: true,
        bookmarked: true
    },
    categories: {
        open: true,
        university: true,
        school: true,
        other: true
    },
    modes: {
        physical: true,
        online: true,
        hybrid: true
    }
};
