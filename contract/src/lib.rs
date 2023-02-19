use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen};

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize, Deserialize, Clone)]
pub struct Book {
    pub id: i64,
    pub author_name: String,
    pub book_name: String,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub id: i64,
    pub user: String,
    pub rental_status: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Contract {
    books: Vector<Book>,
    users: Vector<User>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            books: Vector::new(b"m"),
            users: Vector::new(b"m"),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn new_book(&mut self, author_name: String, book_name: String) {
        let book = Book {
            id: self.books.len() as i64,
            author_name,
            book_name,
        };
        self.books.push(&book);
    }

    pub fn get_books(&self) -> Vec<Book> {
        let mut books = Vec::new();
        for i in 0..self.books.len() {
            books.push(self.books.get(i).unwrap());
        }
        books
    }

    pub fn new_user(&mut self, user: String, rental_status: String) {
        let user = User {
            id: self.users.len() as i64,
            user,
            rental_status,
        };
        self.users.push(&user);
    }

    pub fn get_users(&self) -> Vec<User> {
        let mut users = Vec::new();
        for i in 0..self.users.len() {
            users.push(self.users.get(i).unwrap());
        }
        users
    }
}
