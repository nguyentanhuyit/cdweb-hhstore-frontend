import { useContext } from "react";
import { AuthorContext } from "../context/AuthorContext";
import useFindProductById from "./useFindProductById";

const useGetAuthorName = (productId) => {
  const product = useFindProductById(productId);
  const [authors, setAuthors] = useContext(AuthorContext);
  if (product === null) {
    return "Loading ...";
  }
  const index = authors.findIndex((author) => author.id == product.author);
  if (index === -1) {
    return "Loading authorName...";
  }
  return authors[index].authorName;
};

export default useGetAuthorName;
