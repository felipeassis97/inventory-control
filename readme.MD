
# Mobile App Project - CRUD and Favorites with SQLite and Expo

## Description

This project is a mobile application that allows for the creation, reading, updating, and deletion (CRUD) of products, as well as managing a list of favorites. The app was built using **React Native** with **Expo** and stores data locally using **SQLite**. It also includes features such as displaying banners, product categorization, and support for product search and filtering.

## Architecture

The project follows **Clean Architecture** principles, organizing responsibilities in a modular and separated manner. The architecture is structured into three main layers:

- **UI**: Contains the pages and controllers responsible for the user interface, such as the favorites screen and product screen.
- **Data**: Includes repositories and models, responsible for storing and retrieving data from SQLite.
- **Common**: Houses reusable components, services, and global configurations such as the application theme and navigation.

This modular structure allows for scalability, maintainability, and a clear separation of concerns.

## Features

- **CRUD for Products**: Create, read, update, and delete products.
- **Favorite Products**: Ability to favorite or unfavorite products.
- **Categorization**: Products are organized by categories.
- **Banner Carousel**: Displays promotional banners.
- **Search and Filters**: Allows searching for products and filtering them by category.

## Technologies Used

- **React Native with Expo**: Framework for building native apps using JavaScript and TypeScript.
- **SQLite**: Local database for storing products, categories, and favorites.
- **TypeScript**: Used for static typing and greater development robustness.

## Folder Structure

```bash
├── common
│   ├── components
│   ├── service_locator
│   ├── services
│   ├── theme
│   ├── routes
├── data
│   ├── models
│   ├── repositories
├── ui
│   ├── controllers
│   ├── views
```

- **common**: Reusable components, services, and themes.
- **data**: Data repositories and models.
- **ui**: Pages and controllers responsible for user interaction.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/felipeassis97/inventory-control.git
   ```

2. Install dependencies:

   ```bash
   cd my-store
   yarn install
   ```

3. Start the app with Expo:

   ```bash
   npx expo start
   ```

4. Select your device.

