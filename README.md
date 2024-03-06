# Random Users Listing

This application leverages the [RandomUser.me API](https://randomuser.me) to fetch and display random user details in an interactive interface.

## Technology Stack

- 🟦 TypeScript - A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. [Learn more](https://www.typescriptlang.org/)
- ⚛️ React - A JavaScript library for building user interfaces. [Learn more](https://reactjs.org/)
- ↔ Axios - A promise-based HTTP client for the browser and node.js. [Explore](https://github.com/axios/axios)

## Setting Up the Project

To get the project up and running on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/awais0198/random-users.git
    ```
2. Navigate into the project directory:
    ```bash
    cd random-users
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm start
    ```

After completing these steps, the application should be running on [http://localhost:3000](http://localhost:3000). Open this link in your browser to interact with the app.

## Feature: Search Functionality

The application includes a `filterAndSearch()` function, which enhances the user interface by allowing dynamic searching and filtering of user data. This function accepts an array of user objects as its argument. It then applies filtering criteria to select users that match specific conditions. A user is included in the filtered result if their gender aligns with the applied filter or if their information contains the search term within any of the specified search parameters.
