export default function ColophonPage() {
  return (
    <main className="mx-auto max-w-6xl min-h-screen px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Colophon</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Notes about how this site is built and run.
      </p>

      <h2 className="text-base font-semibold tracking-tight mt-8">
        Tech stack
      </h2>
      <ul className="list-disc list-inside text-md">
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li>TypeScript</li>
      </ul>

      <h2 className="text-base font-semibold tracking-tight mt-8">Fonts</h2>
      <ul className="list-disc list-inside text-md">
        <li>
          Monaspace Neon{" "}
          <a
            href="https://github.com/githubnext/monaspace"
            target="_blank"
            rel="noopener noreferrer"
            className="underline after:content-['↗']"
          >
            Link
          </a>
        </li>
      </ul>

      <h2 className="text-base font-semibold tracking-tight mt-8">Hosting</h2>
      <ul className="list-disc list-inside text-md">
        <li>Vercel</li>
      </ul>

      <h2 className="text-base font-semibold tracking-tight mt-8">
        Source code
      </h2>
      <ul className="list-disc list-inside text-md">
        <li>
          <a
            href="https://github.com/hdprajwal/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline after:content-['↗']"
          >
            hdprajwal/portfolio
          </a>
        </li>
      </ul>

      <h2 className="text-base font-semibold tracking-tight mt-8">
        System Information
      </h2>
      <ul className="list-disc list-inside text-md">
        <li>OS : Arch Linux</li>
        <li>Window Manager : Hyprland</li>
        <li>Browser : Zen Browser</li>
        <li>Editor : vscode</li>
        <li>Terminal : Ghostty</li>
        <li>Shell : Zsh</li>
        <li>
          Dotfiles :{" "}
          <a
            href="https://github.com/hdprajwal/dotfiles"
            target="_blank"
            rel="noopener noreferrer"
            className="underline after:content-['↗']"
          >
            Link
          </a>
        </li>
      </ul>
    </main>
  );
}
