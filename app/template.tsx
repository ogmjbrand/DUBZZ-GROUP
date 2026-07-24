/**
 * Page-transition wrapper — templates remount on every navigation, so this
 * gives each route a soft cinematic entrance without any client JS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up flex flex-1 flex-col">{children}</div>;
}
