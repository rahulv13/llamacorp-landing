export default function AdminLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-white"></div>
        <p className="text-sm font-medium text-white/60">Loading...</p>
      </div>
    </div>
  );
}
