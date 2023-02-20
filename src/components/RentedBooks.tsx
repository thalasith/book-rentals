// time for February 18, 2023 3:50pm IN UNIX
const FEB_18_2023_3_50PM = 1656657000;

const DUMMY_RENT_DATA = [
  {
    id: 0,
    book_id: 1,
    user_id: 1,
    rental_start_time: 1676793286000,
    rental_end_time: 1677743686000,
  },
  {
    id: 1,
    book_id: 0,
    user_id: 1,
    rental_start_time: 1676793286000,
    rental_end_time: 1677743686000,
  },
];

export const RentedBooks = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Rented Books</h1>
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Return All
        </button>
      </div>
    </div>
  );
};
