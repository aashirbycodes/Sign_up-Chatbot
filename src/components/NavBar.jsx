import { useState } from "react";
import { Link } from "react-router";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { FiArrowRight, FiCloud, FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Portals", href: "#portals" },
];

const textLink =
  "text-[15px] font-medium text-gray-600 transition-colors hover:text-neutral-950";
const primaryBtn =
  "inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <FiCloud className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-neutral-950">
              Aashir <span className="text-blue-600">LMS</span>
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Learning Management
            </span>
          </span>
        </Link>

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={textLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth actions (desktop) */}
        <div className="hidden items-center gap-6 md:flex">
          <Show when="signed-out">
            <SignInButton mode="modal"  fallbackRedirectUrl={"./chatboat"} forceRedirectUrl={"./chatboat"}>
              <button type="button" className={textLink}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" className={primaryBtn}>
                Get Started
                <FiArrowRight className="h-4 w-4" />
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link to="/chatboat" className={primaryBtn}>
              chatBoat
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <UserButton />
          </Show>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-lg p-2 text-neutral-900 hover:bg-gray-100 md:hidden"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-200 bg-white px-6 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-center text-base font-medium text-gray-700"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-base font-semibold text-white"
                >
                  Get Started
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link
                to="/chatboat"
                onClick={close}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-base font-semibold text-white"
              >
                chatBoat
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex justify-center pt-1">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
}