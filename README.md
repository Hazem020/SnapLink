# SnapLink
![SnapLink](https://i.imgur.com/gjDAOk6.png)

SnapLink is your go-to solution for lightning-fast URL shortening! Say goodbye to long and cumbersome URLs and hello to concise, shareable links. This Node.js-based service allows users to create, manage, and track the usage of their shortened URLs. 

## Features

- **URL Shortening**: Convert long URLs into concise and shareable short URLs.
- **User Authentication**: Secure signup, login, and logout functionalities for users.
- **URL Management**: Users can view, manage, and delete their URLs.
- **URL Analytics**: Track the number of visits and other statistics for each shortened URL.
- **RESTful API**: Easy-to-use API to interact with SnapLink's URL shortening service.
- **MongoDB**: All URL and user data is stored in MongoDB.

## API Endpoints

### URL Endpoints

- **POST /api/v1/urls/shorten**
  - Shorten a new URL (authenticated).
  - Request body should contain `originalUrl` (the long URL to be shortened).
  - Response includes the shortened URL.
  
- **GET /api/v1/urls/me**
  - Retrieve all URLs created by the logged-in user (authenticated).
  
- **GET /api/v1/urls/:shortUrl**
  - Retrieve the original long URL based on the shortened URL (public).
  
- **GET /api/v1/urls/stats/:id**
  - Retrieve statistics (e.g., number of clicks) for a specific URL (authenticated).
  
- **DELETE /api/v1/urls/:id**
  - Delete a specific shortened URL (authenticated).

### User Endpoints

- **POST /api/v1/users/signup**
  - Register a new user.
  
- **POST /api/v1/users/login**
  - Log in a user.
  
- **POST /api/v1/users/logout**
  - Log out the current user.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) for database management

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/snaplink.git
   cd snaplink
### [API DOCS](https://documenter.getpostman.com/view/28432116/2s9YytgLx7)
![Made With JavaScript](https://forthebadge.com/images/badges/made-with-javascript.svg)
