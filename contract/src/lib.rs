use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::near_bindgen;
use near_sdk::serde::{Deserialize, Serialize};

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
    pub dob: i64,
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
            books: Vector::new(b"u".to_vec()),
            users: Vector::new(b"b".to_vec()),
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
        self.books.to_vec()
    }

    pub fn new_user(&mut self, user: String, dob: i64) {
        let user = User {
            id: self.users.len() as i64,
            user,
            dob,
        };
        self.users.push(&user);
    }

    pub fn get_users(&self) -> Vec<User> {
        self.users.to_vec()
    }
}
