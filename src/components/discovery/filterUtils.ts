import type { FilterState } from './types';

/**
 * Filter competitions based on all active filter criteria
 */
export function filterCompetitions(competitions: any[], filters: FilterState) {
    console.log('Filtering competitions:', { competitions: competitions.length, filters }); // Debug log
    
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
            const predefinedCategories = ['open', 'university', 'school'];
            const hasMatchingCategory = Object.entries(filters.categories).some(([key, value]) => {
                if (!value) return false;
                if (key === 'other') {
                    // "Other" should match any category that is not one of the predefined options
                    return !predefinedCategories.includes(category) && category !== '';
                }
                return category === key.toLowerCase();
            });
            if (!hasMatchingCategory) {
                return false;
            }
        }

        // Keywords filter (search in hashtags only)
        if (filters.keywords.length > 0) {
            const hashtagsText = (comp.hashtags && Array.isArray(comp.hashtags)) 
                ? comp.hashtags.join(' ').toLowerCase() 
                : '';
            console.log('Checking keywords for comp:', comp.title, 'hashtags:', comp.hashtags, 'filter keywords:', filters.keywords); // Debug log
            
            // If no hashtags exist, skip this competition for keyword filtering
            if (!comp.hashtags || !Array.isArray(comp.hashtags) || comp.hashtags.length === 0) {
                console.log('No hashtags found for', comp.title, '- excluding from keyword filter results'); // Debug log
                return false;
            }
            
            const hasKeyword = filters.keywords.some(keyword => 
                hashtagsText.includes(keyword.toLowerCase())
            );
            console.log('Keyword match result:', hasKeyword); // Debug log
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
