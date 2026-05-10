export default function PublicBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-foreground antialiased selection:bg-aero-cyan/30 flex flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
}
