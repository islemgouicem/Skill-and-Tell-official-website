/** Renders one or more JSON-LD blocks (structured data for search engines). */
export default function JsonLd({ data }) {
  const list = Array.isArray(data) ? data : [data];
  return list.map((d, i) => (
    <script
      key={i}
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
    />
  ));
}
