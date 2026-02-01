export function getRandomAvatar(seed?: string) {
    if (!seed) return `https://avatar.vercel.sh/default`;
    return `https://avatar.vercel.sh/${encodeURIComponent(seed)}`;
}
