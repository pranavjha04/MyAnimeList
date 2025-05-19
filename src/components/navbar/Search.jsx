import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery, isLoading }) {
  const inputEl = useRef(null);
  function callBack() {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
  }

  useKey("Enter", callBack);

  return (
    <input
      type="search"
      placeholder="🔍 Search Anime"
      value={query}
      onChange={(e) => setQuery(e.target.value.trimStart())}
      ref={inputEl}
      disabled={isLoading}
    />
  );
}
