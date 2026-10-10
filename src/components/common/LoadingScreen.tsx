function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50" aria-busy="true" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
          aria-hidden="true"
        />
        <p className="text-sm text-slate-600">Checking your session...</p>
      </div>
    </main>
  );
}

export default LoadingScreen;
