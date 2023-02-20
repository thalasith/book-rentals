use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::{env, near_bindgen};

#[derive(BorshDeserialize, BorshSerialize, Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Book {
    pub id: i64,
    pub author_name: String,
    pub book_name: String,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct User {
    pub id: i64,
    pub user: String,
    pub rental_status: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct BookDetails {
    books: Vector<Book>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct UserDetails {
    users: Vector<User>,
}

impl Default for BookDetails {
    fn default() -> Self {
        Self {
            books: Vector::new(b"b".to_vec()),
        }
    }
}

impl Default for UserDetails {
    fn default() -> Self {
        Self {
            users: Vector::new(b"b".to_vec()),
        }
    }
}

#[near_bindgen]
impl BookDetails {
    #[init]
    pub fn new_book() -> Self {
        assert!(!env::state_exists(), "Already initialized");
        Self::default()
    }

    pub fn add_book(&mut self, author_name: String, book_name: String) {
        let book = Book {
            id: self.books.len() as i64,
            author_name,
            book_name,
        };
        self.books.push(&book);
    }

    pub fn get_book_details(&self, id: i64) -> Option<Book> {
        self.books.get(id as u64)
    }

    pub fn get_all_books_details(&self) -> Vec<Book> {
        let mut books: Vec<Book> = Vec::new();
        for i in 0..self.books.len() {
            books.push(self.books.get(i).unwrap());
        }
        books
    }
}

#[near_bindgen]
impl UserDetails {
    #[init]
    pub fn new_user() -> Self {
        assert!(!env::state_exists(), "Already initialized");
        Self::default()
    }

    pub fn add_user(&mut self, user: String, rental_status: String) {
        let user = User {
            id: self.users.len() as i64,
            user,
            rental_status,
        };
        self.users.push(&user);
    }

    pub fn get_user_details(&self, id: i64) -> Option<User> {
        self.users.get(id as u64)
    }

    pub fn get_all_users_details(&self) -> Vec<User> {
        let mut users: Vec<User> = Vec::new();
        for i in 0..self.users.len() {
            users.push(self.users.get(i).unwrap());
        }
        users
    }
}
