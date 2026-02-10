import { createNotification } from "./notifications";

// ==========================================
// Delegate Side Templates
// ==========================================

export async function notifyCompetitionRegistration(userId: string, competitionId: string, competitionName: string) {
    return await createNotification({
        userId,
        title: "Registration Confirmed",
        message: `You have successfully registered for **${competitionName}**. Get ready to compete!`,
        type: "delegate",
        link: `/c/${competitionId}`,
        linkLabel: "Go to Competition"
    });
}

export async function notifyRoundResult(
    userId: string,
    competitionName: string,
    roundName: string,
    isSelected: boolean
) {
    const title = isSelected ? `Round Result: Selected` : `Round Result: Elimination`;
    const message = isSelected
        ? `Congratulations! You have been selected for the next round of **${competitionName}** after completing **${roundName}**.`
        : `Thank you for participating in **${competitionName}**. Unfortunately, you did not qualify for the next round after **${roundName}**.`;

    return await createNotification({
        userId,
        title,
        message,
        type: "delegate",
        // Ideally link to results page if available
    });
}

export async function notifyTimelineReminder(
    userId: string,
    competitionId: string,
    competitionName: string,
    eventName: string,
    timeUntil: string
) {
    return await createNotification({
        userId,
        title: "Upcoming Event Reminder",
        message: `The **${eventName}** for **${competitionName}** starts in ${timeUntil}. Be prepared!`,
        type: "delegate",
        link: `/c/${competitionId}/timeline`, // TODO: Check if this link is correct
        linkLabel: "View Timeline"
    });
}

export async function notifyAnnouncement(userId: string, competitionName: string, announcementText: string) {
    return await createNotification({
        userId,
        title: `Announcement from ${competitionName}`,
        message: announcementText,
        type: "delegate",
    });
}

// ==========================================
// OC Side Templates
// ==========================================

export async function notifyCompetitionCreated(userId: string, competitionId: string, competitionName: string) {
    return await createNotification({
        userId,
        title: "Competition Created",
        message: `You have successfully created the draft for **${competitionName}**. Complete the setup to publish it.`,
        type: "oc",
        link: `/organize/${competitionId}/settings`, // TODO: Check if this link is correct
        linkLabel: "Edit Settings"
    });
}

export async function notifyCompetitionPublished(userId: string, competitionId: string, competitionName: string) {
    return await createNotification({
        userId,
        title: "Published Successfully",
        message: `**${competitionName}** is now live and visible to the public!`,
        type: "oc",
        link: `/c/${competitionId}`, // TODO: Check if this link is correct
        linkLabel: "View Page"
    });
}

export async function notifyInvitationAccepted(userId: string, competitionName: string, inviteeName: string, role: string) {
    return await createNotification({
        userId,
        title: "Invitation Accepted",
        message: `**${inviteeName}** has accepted your invitation to join **${competitionName}** as a ${role}.`,
        type: "oc",
    });
}

export async function notifyAnalyticsMilestone(userId: string, competitionId: string, competitionName: string, milestone: string) {
    return await createNotification({
        userId,
        title: "Milestone Reached!",
        message: `Congratulations! **${competitionName}** has reached **${milestone}**.`,
        type: "oc",
        link: `/organize/${competitionId}/analytics`, // TODO: Check if this link is correct
        linkLabel: "View Analytics"
    });
}

// ==========================================
// System Templates
// ==========================================

export async function notifySystemWarning(userId: string, warningMessage: string) {
    return await createNotification({
        userId,
        title: "Account Warning",
        message: warningMessage,
        type: "system",
    });
}

export async function notifySystemMilestone(userId: string, milestoneTitle: string, milestoneMessage: string, link?: string, linkLabel?: string) {
    return await createNotification({
        userId,
        title: milestoneTitle, // e.g., "New Badge Earned"
        message: milestoneMessage, // e.g., "You've just hit a milestone: Registered for 10 Competitions!"
        type: "system",
        link,
        linkLabel
    });
}

// ==========================================
// Invitation Templates (For Invitee)
// ==========================================

export async function notifyInvitedToJudge(userId: string, competitionId: string, competitionName: string) {
    return await createNotification({
        userId,
        title: "Invitation to Judge",
        message: `You have been invited to be a Judge for **${competitionName}**.`,
        type: "system",
        link: `/competitions/${competitionId}/invitations?tab=judge`, // TODO: Check if this link is correct
        linkLabel: "View Invitation"
    });
}

export async function notifyInvitedToJoinOC(userId: string, competitionId: string, competitionName: string) {
    return await createNotification({
        userId,
        title: "Invitation to Join OC",
        message: `You have been invited to join the Organizing Committee for **${competitionName}**.`,
        type: "system",
        link: `/competitions/${competitionId}/invitations?tab=oc`, // TODO: Check if this link is correct
        linkLabel: "View Invitation"
    });
}
