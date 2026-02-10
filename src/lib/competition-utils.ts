import { getFileUrlById } from "./utils";

/**
 * Calculate competition status based on dates and user registration
 */
export function calculateCompetitionStatus(
    comp: any,
    isUserRegistered = false
): "Upcoming" | "Ongoing" | "Closed" | "Registered" | "Finished" {
    const now = new Date();
    const startDate = comp.startDate ? new Date(comp.startDate) : null;
    const endDate = comp.endDate ? new Date(comp.endDate) : null;
    const registrationDeadline = comp.registrationDeadline ? new Date(comp.registrationDeadline) : null;

    // If user is registered, show registration-specific statuses
    if (isUserRegistered) {
        if (endDate && now > endDate) {
            return "Finished"; // Competition ended and user participated
        }
        return "Registered"; // User is registered for upcoming or ongoing competition
    }

    // For non-registered users, show general statuses
    if (startDate && now < startDate) {
        return "Upcoming"; // Competition hasn't started yet
    }

    if (startDate && endDate && now >= startDate && now <= endDate) {
        return "Ongoing"; // Competition is currently running
    }

    if (endDate && now > endDate) {
        return "Closed"; // Competition has ended
    }

    // Default fallback
    return "Upcoming";
}

/**
 * Maps competition data to CompetitionCard props
 */
export function mapCompetitionToCardProps(comp: any, isBookmarked = false, isUserRegistered = false) {
    const imageUrl = comp.imageUrl && typeof comp.imageUrl === 'string'
        ? getFileUrlById(comp.imageUrl)
        : undefined;

    const status = calculateCompetitionStatus(comp, isUserRegistered);

    return {
        competitionId: comp.id,
        title: comp.title || "Untitled",
        description: comp.shortDescription || comp.tagline || comp.description || "No description available",
        status,
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
