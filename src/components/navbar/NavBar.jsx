import Search from "./Search";
import MyList from "./MyList";

export default function NavBar({ query, setQuery, isLoading, onClick }) {
  function handleReload() {
    window.location.reload();
  }
  return (
    <nav>
      <h1 onClick={handleReload}>🍿 MY ANIME LIST</h1>
      <Search query={query} setQuery={setQuery} isLoading={isLoading} />
      <MyList onClick={onClick} />
    </nav>
  );
}
