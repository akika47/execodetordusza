"use client";

import React, { useState, useRef, useEffect } from "react";

type AutocompleteProps = {
  suggestions: string[];
  onSelect?: (value: string) => void; // Make sure this is included in Autocomplete's props
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  onSelect,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userInput === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [userInput, suggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClick = (suggestion: string) => {
    console.log("Selected suggestion:", suggestion);
    setUserInput(suggestion);
    setFilteredSuggestions([]);
    if (onSelect) {
      onSelect(suggestion); // Call onSelect to update parent state
    }
    console.log("Suggestions:", suggestions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      setUserInput(filteredSuggestions[activeSuggestionIndex]);
      setFilteredSuggestions([]);
    }
  };

  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Kezdjen el gépelni..."
      />
      {filteredSuggestions.length > 0 && (
        <div className="autocomplete-items">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`autocomplete-item ${
                index === activeSuggestionIndex ? "autocomplete-active" : ""
              }`}
              onClick={() => handleClick(suggestion)}
            >
              <strong>{suggestion.substring(0, userInput.length)}</strong>
              {suggestion.substring(userInput.length)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
