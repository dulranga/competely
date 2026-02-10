# Competition Card Usage Analysis

This report identifies where `CompetitionCard` components are used in the application and whether they are connected to the database or using mock data.

## Summary

| Page / Component | Section | Data Source | Details |
| :--- | :--- | :--- | :--- |
| **Discover Page** | Search Results | ✅ **Real (DB)** | Fetched in `page.tsx` via `getAllCompetitions` / `searchCompetitions` and passed to `DiscoverContent`. |
| **Discover Page** | Recently Visited | ⚠️ **Mock Data** | Uses `competitionsData` from `src/components/sample-data/competitions.json`. |
| **Home Page** | Recommended | ⚠️ **Mock Data** | Hardcoded loop with static data in `src/app/(authenticated)/home/page.tsx`. |
| **Home Page** | Trending Now | ⚠️ **Mock Data** | Hardcoded loop with static data in `src/app/(authenticated)/home/page.tsx`. |
| **My Competitions** | Registered | ⚠️ **Mock Data** | Hardcoded `registeredCompetitions` array in `src/app/(authenticated)/my-competitions/page.tsx`. |
| **My Competitions** | Finished | ⚠️ **Mock Data** | Hardcoded `finishedCompetitions` array in `src/app/(authenticated)/my-competitions/page.tsx`. |
| **Bookmarks** | Main Grid | ✅ **Real (DB)** | Fetched via `getBookmarkedCompetitions()` in `src/app/(authenticated)/bookmarks/page.tsx`. |

## Detailed Breakdown

### 1. Discover Page (`src/app/(public)/discover/page.tsx`)
- **Component**: `DiscoverContent`
- **Status**: **Mixed**
- **Real Data**: The main search results grid receives `initialCompetitions` from the server component, which fetches real data using `getAllCompetitions()` or `searchCompetitions()`.
- **Mock Data**: The "Recently Visited" section (visible when not searching) directly imports and uses mock data from `src/components/sample-data/competitions.json`.

### 2. Home Page (`src/app/(authenticated)/home/page.tsx`)
- **Component**: `HomePage`
- **Status**: **Mostly Mock**
- **Real Data**: The `Timeline` section uses real data (`getDelegateTimeline(user)`), but this does not use `CompetitionCard`.
- **Mock Data**: Both "Recommended" and "Trending Now" sections use `CompetitionCard` inside a loop `Array.from({ length: 5 })` with hardcoded static props (e.g., "HackExtreme", "Ongoing").

### 3. My Competitions Page (`src/app/(authenticated)/my-competitions/page.tsx`)
- **Component**: `CompetitionsPage`
- **Status**: **Fully Mock**
- **Mock Data**: Defines two local arrays `registeredCompetitions` and `finishedCompetitions` with hardcoded objects. Calls `CompetitionCard` with these static values.

### 4. Bookmarks Page (`src/app/(authenticated)/bookmarks/page.tsx`)
- **Component**: `BookmarksPage`
- **Status**: **Fully Real**
- **Real Data**: Fetches data using `getBookmarkedCompetitions()` and maps it to `CompetitionCard` props using `mapCompetitionToCardProps`.

### 5. Create Page (`src/components/create/CreatePageContent.tsx`)
- **Note**: Uses `MyCompetitionCard`, not `CompetitionCard`. As requested, this was ignored.

### 6. Test Pages (`src/app/(public)/test/...`)
- **Status**: **Mock**
- Purely for testing UI variants.

---

## Proposed Logic for Data Population

Based on the existing Drizzle schema (`schema.ts`, `relations.ts`), here is the proposed logic for populating the mock sections with real data.

### 1. Recently Visited (Discover Page)
*   **Current State:** Uses static JSON data.
*   **Proposed Logic:**
    *   **Mechanism:** Client-side tracking using `localStorage` (e.g., key `competely_recent_visits` storing up to 5 IDs).
    *   **Action:** When a user visits a competition page, add its ID to the top of the list.
    *   **Fetching:** On the Discover page info, read IDs from `localStorage` and fetch basic details (title, poster, status) via a server action or API endpoint (e.g., `getCompetitionsByIds(ids)`).
    *   *Note:* No database schema change required.

### 2. Recommended (Home Page)
*   **Current State:** Hardcoded loop.
*   **Proposed Logic:**
    *   **Data Source:** `competitions` table and `user_interests` table.
    *   **Query:** Select competitions where `competitions.category` matches any of the current user's interests from `user_interests`.
    *   **Sorting:** Prioritize `startDate` (Upcoming) or recently created.
    *   **Fallback:** If the user has no interests or no matches found, fallback to "Trending" or "Newest" competitions.

### 3. Trending Now (Home Page)
*   **Current State:** Hardcoded loop.
*   **Proposed Logic:**
    *   **Data Source:** `competitions` and `bookmarks` tables.
    *   **Query:** Aggregation query to count bookmarks for each competition.
    *   **SQL Logic:** `SELECT competition_id, COUNT(*) as popularity FROM bookmarks GROUP BY competition_id ORDER BY popularity DESC`.
    *   **Timeframe:** Filter for competitions that are `status = 'published'` and `endDate > NOW()` (active competitions only).

### 4. Registered Competitions (My Competitions Page)
*   **Current State:** Static local array.
*   **Proposed Logic:**
    *   **Data Source:** `bookmarks` table joined with `competitions`.
    *   **Query:** Select competitions where `bookmarks.userId = currentUserId` **AND** `bookmarks.isRegistered = true`.
    *   *Note:* The `bookmarks` table currently has an `is_registered` boolean column which can be used for this purpose.

### 5. Finished Competitions (My Competitions Page)
*   **Current State:** Static local array.
*   **Proposed Logic:**
    *   **Data Source:** `bookmarks` table joined with `competitions`.
    *   **Query:** Select competitions where:
        1.  `bookmarks.userId = currentUserId`
        2.  `bookmarks.isRegistered = true`
        3.  `competitions.endDate < NOW()` (The competition has ended).
