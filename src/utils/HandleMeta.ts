// Create and set meta tags
export function setMetaTag(property: string, content: string) {
  const metaTag = document.createElement("meta");
  metaTag.setAttribute("property", property);
  metaTag.setAttribute("content", content);
  document.head.appendChild(metaTag);
}

// Call the function to set OG tags
