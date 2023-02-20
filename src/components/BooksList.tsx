import { useCallback, useState, useEffect } from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import { providers, keyStores, Near, WalletConnection } from "near-api-js";
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
      .then((res) => JSON.parse(Buffer.from(res.result).toString()) as Book[])
      .catch((err) => {
        console.log("Failed to get books");
        console.error(err);
        return [];
      });
  }, [selector]);

  useEffect(() => {
    getBooks()
      .then((res) => {
        setBooks(res);
      })
      .catch((err) => {
        console.log("Failed to get books");
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full">
      <h1 className="pb-2 text-xl font-bold">List of Available Book to Rent</h1>
      {/* Make sure books are empty */}
      {books.length === 0 && <p>No books found</p>}
      <div className="flex w-full flex-col pt-2">
        {books.length !== 0 &&
          books.map((book: Book) => {
            return (
              <div key={book.id} className="flex w-full py-2">
                <p className="mr-2 w-1/2 ">
                  <span className="font-bold">{book.book_name}</span> by{" "}
                  {book.author_name}
                </p>
                <button className="rounded bg-green-500 px-2">
                  Available for Rent
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
