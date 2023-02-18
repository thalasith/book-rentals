import { useCallback, useState, useEffect } from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import { providers } from "near-api-js";
import type { CodeResult } from "near-api-js/lib/providers/provider";
import { CONTRACT_ID } from "../constants";

interface Book {
  id: number;
  book_name: string;
  author_name: string;
}

export const BooksList = () => {
  const { selector, accountId } = useWalletSelector();
  const [books, setBooks] = useState<Book[]>([]);
  const getBooks = useCallback(() => {
    const { network } = selector.options;

    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
    //base64 encoded id
    const account = JSON.stringify({ lookup_account: accountId });

    const base64 = Buffer.from(account).toString("base64");

    return provider
      .query<CodeResult>({
        request_type: "call_function",
        account_id: CONTRACT_ID,
        method_name: "get_all_books_details",
        args_base64: base64,
        finality: "optimistic",
      })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  }, [selector]);

  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res);
    });
  }, []);
  console.log(books);

  return (
    <div>
      <h1>Books List</h1>
      {/* Make sure books are empty */}
      {books.length === 0 && <p>No books found</p>}
      {books.length !== 0 &&
        books.map((book: any) => {
          return (
            <div key={book.id}>
              <h2>{book.book_name}</h2>
              <p>{book.author_name}</p>
            </div>
          );
        })}
    </div>
  );
};
