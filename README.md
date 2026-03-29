**Personal Book Manager**
Overview  
Personal Book Manager is a web application designed to manage personal book collections. It provides tools to add, edit, delete, and list books, authors, and genres, with a clean interface and a MySQL-backed backend.

Key Features
Book management: add, update, delete, and filter by genre or reading status
Author management: create, edit, and remove authors with full details
Genre management: create, edit, and remove genres
Real-time listings and search functionality
Basic validations to ensure data consistency

Technology Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js
Database: MySQL

Usage
Access forms via the Actions menu to manage books, authors, and genres
Search and filter records directly from listings
Statistics panel shows real-time counts of books, authors, and genres

**Welcome to the Digital Library**
This platform allows you to manage books, authors, and genres in a simple and efficient way.
Below you will find instructions on how to use all its features.

Using the Actions Menu
Use the Actions button at the top to access the forms for adding or removing books, authors, and genres. Here is how each option works:

Add a New Book
Before adding a book, make sure the author and genre already exist in the database.
If they do not exist, add them first using the corresponding options in the Actions menu.
Books cannot be created without an author or genre. If you try to delete an author or genre that is in use, the platform will notify you and ask for confirmation.
To add a book, complete all required fields: title, author, genre, and reading status.

Delete Books
You can delete books by entering the full and exact title.
Be careful: this action cannot be undone.

Add and Delete Authors
Add Author: Enter the full name and nationality of the author.

Delete Author: Enter the full name of the author you want to remove.
Note: Deleting an author will also remove all books associated with that author. The system will display an alert, and you must confirm before continuing.

Add and Delete Genres
Add Genre: Enter the full name of the genre (no abbreviations).

Delete Genre: Enter the full and exact name of the genre you want to remove.

Editing Records
Edit a Book: From the general list, you can freely edit the book title. For author, genre, and reading status, you can only select from existing options using a dropdown menu.
Edit an Author: You can modify both the name and nationality directly from the list.
Edit a Genre: You can modify the genre name directly from the list of genres.

Listings and Search
Each section displays a list of all registered books, authors, or genres.
Use the search bar to quickly filter books by title, genre, reading status, or author.
Click "Edit" next to any record to modify it directly from the list.
On the home page, you will see a statistics panel that shows in real time the number of books, authors, and genres currently registered.

Useful Tips
If you receive an error message when adding a book indicating that the author or genre does not exist, add them first using the Actions menu.
Forms are dynamic: when you add, edit, or delete, the information updates automatically without reloading the page.
To avoid errors, always use full and exact names when deleting or editing records.

Use the Actions menu (top button) to access the forms for adding, editing, or deleting books, authors, and genres.
