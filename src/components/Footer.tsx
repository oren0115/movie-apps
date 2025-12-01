export function Footer() {
  return (
    <footer className="border-t bg-background/90 backdrop-blur">
      <div className="container flex flex-col gap-3 px-4 py-6 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
        <p className="font-medium text-foreground">
          © {new Date().getFullYear()} FilmApp. Semua hak dilindungi.
        </p>
        <p>
          Data film berasal dari TMDB. Aplikasi ini tidak berafiliasi secara
          resmi dengan TMDB.
        </p>
      </div>
    </footer>
  )
}


