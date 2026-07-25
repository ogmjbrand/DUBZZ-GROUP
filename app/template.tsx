import PageTransition from "@/components/motion/PageTransition";

/**
 * Page-transition wrapper — templates remount on every navigation, which is
 * what drives the entrance in PageTransition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
