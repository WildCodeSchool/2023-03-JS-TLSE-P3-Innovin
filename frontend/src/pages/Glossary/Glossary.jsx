import React, { useState, useRef, useEffect } from "react";
import lexique from "./lexique-vin";
import "./Glossary.css";
import Navbar from "../../components/Navbar/Navbar";

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
    <div className="glossary-content">
      <Navbar />
      <div className="content">
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
        ))}{" "}
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
  );
}
