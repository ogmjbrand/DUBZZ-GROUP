import { permanentRedirect } from "next/navigation";

/**
 * Retired: the corporate story lives at /about.
 *
 * This route duplicated /about with a second, invented set of governance
 * principles — including a claim that "the estate's second phase was paid for
 * by the atelier's third run", which describes revenue the Group has never
 * reported for a property it has not built. Nothing linked here, so the page
 * was unreviewed surface area making claims the profile does not support.
 *
 * Kept as a redirect rather than deleted so any external link still lands on
 * the story it was looking for.
 */
export default function GroupStoryPage() {
  permanentRedirect("/about");
}
