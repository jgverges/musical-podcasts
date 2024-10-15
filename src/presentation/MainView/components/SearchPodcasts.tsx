import React from "react";
import { useAppStore } from "../../../application/stores/useAppStore";

const SearchPodcasts = () => {
  const { searchTerm, setSearchTerm } = useAppStore();

  return (
    <div>
      <input
        id="Filter Podcasts"
        name="Filter Podcasts"
        type="text"
        placeholder="Search Podcasts..."
        value={searchTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
        className="search-input"
      />
    </div>
  );
};

export default SearchPodcasts;
