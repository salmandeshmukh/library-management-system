const formatAuthors = (
  authors,
  author
) => {

  if (
    Array.isArray(authors)
  ) {

    if (
      authors.length === 1

      &&

      typeof authors[0]
        === "string"

      &&

      authors[0].startsWith("[")
    ) {

      return JSON.parse(
        authors[0]
      ).join(", ");
    }

    return authors.join(", ");
  }

  return author || "-";
};

export default
  formatAuthors;