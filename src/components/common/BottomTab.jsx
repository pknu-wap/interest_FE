import { Link, useLocation } from "react-router";

import "./BottomTab.css";

const tabs = [
  {
    label: "배우기",
    to: "/units/unit1",
    match: (path) => path.startsWith("/units") || path.startsWith("/learn"),
  },
  {
    label: "해보기",
    to: "/mock-invest",
    match: (path) => path.startsWith("/mock-invest"),
  },
  { label: "내기록", to: "/records", match: (path) => path.startsWith("/records") },
];

export default function BottomTab() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-tab">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          to={tab.to}
          className={tab.match(pathname) ? "active" : ""}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}