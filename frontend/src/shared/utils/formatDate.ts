export default function formatDate(date: Date) {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	const diffSec = Math.floor(diffMs / 1000);
	if (diffSec < 60) return "now";

	const diffMin = Math.floor(diffSec / 60);
	if (diffMin < 60) return `${diffMin}m`;

	const diffH = Math.floor(diffMin / 60);
	if (diffH < 24) return `${diffH}h`;

	const diffD = Math.floor(diffH / 24);
	if (diffD < 7) return `${diffD}d`;

	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});
}
