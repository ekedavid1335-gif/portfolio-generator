
import { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: "⌂" },
  { name: "My Portfolios", path: "/my-portfolios", icon: "▤" },
  { name: "Templates", path: "/templates", icon: "▦" },
  { name: "Settings", path: "/settings", icon: "⚙" },
];

export default function AppLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const applyAppearance = useCallback((appearance) => {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark =
      appearance === "dark" ||
      (appearance === "system" && systemDark);

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark
      ? "dark"
      : "light";

    document.body.style.backgroundColor = isDark
      ? "#000000"
      : "#f7f7f7";

    document.body.style.color = isDark
      ? "#ffffff"
      : "#171717";
  }, []);

  useEffect(() => {
    const loadAppearance = () => {
      const saved = localStorage.getItem("appearance") || "light";
      applyAppearance(saved);
    };

    const handleAppearanceChange = (event) => {
      const appearance =
        event.detail ||
        localStorage.getItem("appearance") ||
        "light";

      applyAppearance(appearance);
    };

    const handleStorage = (event) => {
      if (event.key === "appearance") {
        applyAppearance(event.newValue || "light");
      }
    };

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemChange = () => {
      if (localStorage.getItem("appearance") === "system") {
        applyAppearance("system");
      }
    };

    loadAppearance();

    window.addEventListener(
      "appearance-change",
      handleAppearanceChange
    );
    window.addEventListener("storage", handleStorage);
    media.addEventListener("change", handleSystemChange);

    return () => {
      window.removeEventListener(
        "appearance-change",
        handleAppearanceChange
      );
      window.removeEventListener("storage", handleStorage);
      media.removeEventListener("change", handleSystemChange);
    };
  }, [applyAppearance]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#171717] transition-colors dark:bg-black dark:text-white md:flex">
      <aside className="w-full border-b border-gray-200 bg-white p-4 dark:border-[#262626] dark:bg-black md:sticky md:top-0 md:h-screen md:w-[230px] md:shrink-0 md:border-b-0 md:border-r md:p-5">
        <div className="flex items-center justify-between">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-black font-bold text-white dark:bg-white dark:text-black">
              P
            </span>

            <span className="text-lg font-bold tracking-tight">
              Portfolify
            </span>
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg border border-gray-200 px-3 py-2 dark:border-[#333] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        <nav
          className={`mt-6 gap-2 ${
            mobileMenu ? "flex flex-col" : "hidden"
          } md:flex md:flex-col`}
        >
          <p className="mb-2 px-3 text-[10px] font-bold tracking-[2px] text-gray-500">
            WORKSPACE
          </p>

          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#191919]"
                }`
              }
            >
              <span className="w-5 text-center text-lg">
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 hidden rounded-xl border border-gray-200 p-3 text-xs text-gray-500 dark:border-[#292929] md:block">
          Your creative workspace
          <p className="mt-1 font-medium text-black dark:text-white">
            Build something great.
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
