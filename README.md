# To-Do App

A simple to-do application with a Rails backend providing RESTful APIs and a JavaScript frontend for task management. Users can create, read, update, and delete tasks. This app demonstrates basic CRUD functionality and cross-platform integration using the `rack-cors` gem.

## Features

- **Backend**: Built with Ruby on Rails, providing APIs to interact with tasks.
- **Frontend**: JavaScript-based, fetching and displaying data from the Rails API.
- **CORS Support**: Cross-platform functionality enabled by the `rack-cors` gem, allowing frontend and backend to communicate securely.

## Setup

### Backend Setup (Rails API)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Musharraf29/todo-app.git
   cd todo-app
2. **Install Dependencies**
 bundle install
3.**Setup the database and Run the Server**
 rails db:create db:migrate To run Server:rails s
