import React, { useState, useRef, useEffect } from "react";
import lexique from "./lexique-vin";
import "./Glossary.css";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/Logo_W_Circles.svg";

export default function LexiqueVin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const definitionRef = useRef(null);

  const groupByLetter = (definitions) => {
    const grouped = {};
    definitions.forEach((item) => {
      const firstLetter = item.mot.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(item);
    });
    return grouped;
  };

  const groupedDefinitions = groupByLetter(lexique);
  const letters = Object.keys(groupedDefinitions).sort();

  const scrollToLetter = (letter) => {
    const letterElement = document.getElementById(letter);
    if (letterElement) {
      letterElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchItemClick = (definition) => {
    scrollToLetter(definition.mot.charAt(0).toUpperCase());
    setSearchTerm(""); // Clear the search term after selecting a search result
  };

  const searchResults = searchTerm
    ? lexique.filter((item) =>
        item.mot.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButton(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="glossary-content">
        <div className="content">
          <div className="img-logo">
            <img src={logo} alt="" />
          </div>
          <h1>Glossaire du vin</h1>
          <div className="alphabet">
            {Array.from(Array(26), (e, i) => i + 65).map((charCode) => {
              const letter = String.fromCharCode(charCode);
              return (
                <button
                  type="button"
                  key={letter}
                  onClick={() => {
                    scrollToLetter(letter);
                    setSearchTerm("");
                  }}
                  style={{ margin: "7px" }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Rechercher une définition..."
            />
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.slice(0, 4).map((definition) => (
                  <li
                    key={definition.id}
                    onClick={() => handleSearchItemClick(definition)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        handleSearchItemClick(definition);
                      }
                    }}
                    tabIndex="0"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="button"
                  >
                    {definition.mot}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {letters.map((letter) => (
            <div key={letter} id={letter}>
              <h2>{letter}</h2>
              {groupedDefinitions[letter].map((item) => (
                <div
                  key={item.id}
                  id={item.mot.toLowerCase()}
                  ref={
                    item.mot.toLowerCase() === searchTerm.toLowerCase()
                      ? definitionRef
                      : null
                  }
                >
                  <h3>{item.mot}</h3>
                  <p>{item.definition}</p>
                </div>
              ))}
            </div>
          ))}
          {showScrollButton && (
            <button
              type="button"
              className="scroll-button"
              onClick={handleScrollToTop}
            >
              {" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
