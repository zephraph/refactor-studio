import React from "react";
import { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { useDebounce } from "use-debounce";

import { searchForRepo } from "../lib/github";

export interface RepositorySelectorProps {
  onSelect?: (repository: string) => void;
}

export const RepositorySelector: React.SFC<RepositorySelectorProps> = ({
  // tslint:disable-next-line:no-empty
  onSelect = (repo: string) => {}
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(
    () => {
      if (!debouncedSearchTerm) {
        return;
      }
      searchForRepo(debouncedSearchTerm).then((results) => {
        // tslint:disable-next-line:no-console
        console.log(results);
        setSearchResults(results.data.items.map((d) => d.full_name));
      });
    },
    [debouncedSearchTerm]
  );

  return (
    <div style={{ height: "30px" }}>
      <AutoComplete
        placeholder="Search for a repo"
        value={searchTerm}
        dataSource={searchResults}
        onSearch={setSearchTerm}
        // tslint:disable-next-line:jsx-no-multiline-js
        onSelect={(value, options) => {
          // tslint:disable-next-line:no-console
          console.log("selected", value, options);
          onSelect(value as string);
          setSearchResults([]);
          setSearchTerm("");
        }}
      />
    </div>
  );
};
