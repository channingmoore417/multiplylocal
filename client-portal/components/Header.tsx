export default function Header({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-10">
      <span className="font-display text-3xl uppercase tracking-wide">
        MULTI<span className="text-accent">×</span>PLY
      </span>
      {signedIn && (
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="text-sm uppercase tracking-widest text-ink/60 transition-colors hover:text-accent"
          >
            Sign out
          </button>
        </form>
      )}
    </header>
  );
}
