import Link from "next/link";

const socialLinks = [
  { href: "https://instagram.com/", label: "Instagram" },
  { href: "https://vimeo.com/", label: "Vimeo" },
  { href: "https://youtube.com/", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono-meta text-gray-400 dark:text-gray-600">
          © {year} Studio. All rights reserved.
        </p>

        <nav className="flex items-center gap-5">
          {socialLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-meta text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
