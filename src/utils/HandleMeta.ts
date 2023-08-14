// Create and set meta tags
export function setMetaTag(property: string, content: string) {
  const metaTag = document.createElement("meta");
  metaTag.setAttribute("property", property);
  metaTag.setAttribute("content", content);
  document.head.appendChild(metaTag);
}

// Call the function to set OG tags
setMetaTag("og:title", "Your Page Title");
setMetaTag("og:description", "Your Page Description");
setMetaTag("og:image", "URL_TO_YOUR_IMAGE");
setMetaTag("og:url", "URL_OF_YOUR_PAGE");
setMetaTag("og:type", "website");
