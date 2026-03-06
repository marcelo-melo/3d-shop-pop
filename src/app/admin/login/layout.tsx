export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page has its own full-page layout, no sidebar
  return children;
}
