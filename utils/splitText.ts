import React, { createElement } from "react";

type elementType = "span" | "div";
type splitTextProps = {
  text: string;
  isWord?: boolean;
  element?: elementType;
  containerClass?: string;
  className?: string;
};

const splitString = (text: string, isWord: boolean) => {
  if (isWord) {
    return text.split(" ").map((char) => char);
  } else {
    return text.split("").map((char) => char);
  }
};

export default function splitText({
  text,
  isWord = true,
  element = "span",
  containerClass = "",
  className = "",
}: splitTextProps) {
  const chars = splitString(text, isWord);

  const els: (
    | React.DetailedReactHTMLElement<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    | string
  )[] = [];

  chars.forEach((char, i) => {
    if (!isWord && char === " ") {
      els.push(" ");
      return;
    }
    els.push(
      createElement(
        element,
        { className: `${containerClass} inline-block`, key: i },
        createElement(
          element,
          { className: `${className} inline-block`, key: i },
          char
        )
      )
    );

    if (isWord) {
      els.push(" ");
      return;
    }
  });

  return els;
}
