import { getFileUrlById } from "./utils";

/**
 * Maps competition data to CompetitionCard props
 */
export function mapCompetitionToCardProps(comp: any, isBookmarked = false) {
    const imageUrl = comp.imageUrl && typeof comp.imageUrl === 'string'
        ? getFileUrlById(comp.imageUrl)
        : undefined;

    return {
        competitionId: comp.id,
        title: comp.title || "Untitled",
        status: comp.status as any,
        ...(imageUrl && { imageUrl }),
        organizerName: comp.organizerName || "",
        category: comp.category || "",
        registeredCount: comp.registeredCount || 0,
        deadline: comp.deadline ? new Date(comp.deadline).toLocaleDateString() : "TBA",
        startDate: comp.startDate,
        endDate: comp.endDate,
        isRegistered: comp.isRegistered,
        isBookmarked,
    };
}
