import { useEffect, useState } from "react";
import DocxEditViewer from "./DocxEditViewer";
import ContentEditViewer from "./ContentEditViewer";
import "./App.css";

const PAGES = [
  { hash: "#/docx-edit", label: "DOCX Edit", Component: DocxEditViewer },
  { hash: "#/content-edit", label: "Content Edit", Component: ContentEditViewer },
];

const getCurrentPage = () =>
  PAGES.find((page) => page.hash === window.location.hash) ?? PAGES[0];

const App = () => {
  const [page, setPage] = useState(getCurrentPage);

  useEffect(() => {
    const onHashChange = () => setPage(getCurrentPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const { Component } = page;

  return (
    <div className="App">
      <div className="header">
        <span className="title">React sample</span>
        <nav className="nav">
          {PAGES.map(({ hash, label }) => (
            <a
              key={hash}
              href={hash}
              className={hash === page.hash ? "active" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      {/* key forces a fresh WebViewer instance when switching pages */}
      <Component key={page.hash} />
    </div>
  );
};

export default App;
