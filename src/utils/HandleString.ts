export const slugifyString: (field: string) => string = (str: string) => {
  return str
    .toLowerCase()
    .trim()

    .replace(/[/\s]+/g, "_");
};

export const handleUrl: (url: string, params: string[]) => string[] = (
  str: string,
  params: string[]
) => {
  let results: string[] = [];
  const queryStr = new URLSearchParams(str);
  params.forEach((param) => results.push(queryStr.get(param) || ""));

  return results;
};
