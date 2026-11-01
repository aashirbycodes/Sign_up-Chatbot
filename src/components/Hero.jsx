import { Link } from "react-router";
import { Show, SignUpButton } from "@clerk/react";
import { FiArrowRight, FiBarChart2 } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const sidebar = [
  "Dashboard",
  "Students",
  "Courses",
  "Admissions",
  "Attendance",
  "Finance",
  "Reports",
];

const stats = [
  { label: "Students", value: "2,840" },
  { label: "Admissions", value: "386" },
  { label: "Courses", value: "48" },
  { label: "Revenue", value: "Rs 4.8M" },
];

const bars = [38, 52, 44, 66, 58, 74, 62, 86, 78, 92, 84, 100];

const primaryBtn =
  "inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800";
const outlineBtn =
  "inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-neutral-900 transition-colors hover:bg-gray-50";

function DashboardPreview() {
  return (
    <div className="w-full rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
      {/* Address pill */}
      <div className="flex justify-center px-6 pt-5">
        <div className="w-44 rounded-full border border-gray-200 bg-gray-50 py-1.5 text-center text-[10px] text-gray-500">
          lms.aashirclouds.net
        </div>
      </div>

      <div className="mt-5 flex border-t border-gray-200">
        {/* Sidebar */}
        <aside className="hidden w-40 shrink-0 border-r border-gray-200 p-5 sm:block">
          <div className="h-7 w-7 rounded-lg bg-neutral-900" />
          <ul className="mt-8 space-y-4">
            {sidebar.map((item, i) => (
              <li
                key={item}
                className={`text-[11px] ${
                  i === 0 ? "font-semibold text-neutral-950" : "text-gray-500"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-950">
                Overview
              </h3>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Institute performance
              </p>
            </div>
            <span className="rounded-lg border border-gray-200 px-3 py-1.5 text-[10px] text-gray-500">
              This month
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <p className="text-[10px] text-gray-500">{s.label}</p>
                <p className="mt-2 text-xl font-bold tracking-tight text-neutral-950">
                  {s.value}
                </p>
                <p className="mt-2 text-[9px] font-medium text-emerald-500">
                  +12.4% this month
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-neutral-950">
                Enrollment overview
              </p>
              <FiBarChart2 className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <div className="mt-4 flex h-24 items-end gap-2" aria-hidden="true">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-md ${
                    i === bars.length - 1 ? "bg-blue-600" : "bg-blue-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-24">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm">
            <HiOutlineSparkles className="h-4 w-4 text-blue-600" />
            Built for modern training institutes
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tighter text-neutral-950 sm:text-6xl lg:text-7xl">
            Run your entire institute from{" "}
            <span className="text-blue-600">one platform.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            Aashir Clouds LMS connects admissions, students, courses, attendance,
            finance, certificates, staff, reporting, and student portals in one
            modern learning management platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button type="button" className={primaryBtn}>
                  Get Started
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link to="/dashboard" className={primaryBtn}>
                Go to Dashboard
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </Show>
            <a href="#platform" className={outlineBtn}>
              Explore platform
            </a>
          </div>
        </div>

        {/* Dashboard preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}