import React from "react";

/**
 * Castelforte keeps its alternate alphabet in the lowercase slots, which is
 * the cut the brand uses, so `.ody-display` folds display text to lowercase.
 * The brand's "Aa" cut only capitalizes the first letter of each word (the
 * rest of the word stays in the lowercase-slot alternate glyphs), so this
 * walks the string as alternating letter-runs / non-letter-runs and raises
 * just the first character of every letter-run back to true uppercase.
 *
 * The run is wrapped in a single inline span: several of these titles sit in
 * flex rows, and bare fragments would each become their own flex item and
 * pick up the row gap between letters.
 */
function Display({ children }) {
  const tokens = String(children).match(/[A-Za-z]+|[^A-Za-z]+/g) ?? [];

  return (
    <span className="whitespace-pre-wrap">
      {tokens.map((token, index) => {
        if (!/[A-Za-z]/.test(token)) {
          return <React.Fragment key={index}>{token}</React.Fragment>;
        }

        const first = token.slice(0, 1);
        const rest = token.slice(1);

        return (
          <React.Fragment key={index}>
            <span className="ody-keep-case">{first.toUpperCase()}</span>
            {rest}
          </React.Fragment>
        );
      })}
    </span>
  );
}

export default React.memo(Display);
