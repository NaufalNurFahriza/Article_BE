# API Documentation

## Base URL
`http://localhost:3000/api`

## Authentication

### Register
- **Endpoint**: `POST /register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "Admin" | "User" (optional, defaults to "User")
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "number"
  }
  ```

### Login
- **Endpoint**: `POST /login`
- **Description**: Login a user
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "userId": "number",
    "username": "string",
    "role": "Admin" | "User",
    "token": "string"
  }
  ```

### Get Profile
- **Endpoint**: `GET /profile`
- **Description**: Get user profile information
- **Authorization**: Required (JWT token)
- **Response**:
  ```json
  {
    "id": "number",
    "username": "string",
    "role": "Admin" | "User",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```

## Categories

### Get All Categories
- **Endpoint**: `GET /categories`
- **Description**: Get all categories
- **Authorization**: Not required
- **Response**:
  ```json
  [
    {
      "id": "number",
      "userId": "number",
      "name": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
  ```

### Get Category by ID
- **Endpoint**: `GET /categories/:id`
- **Description**: Get category by ID
- **Authorization**: Not required
- **Response**:
  ```json
  {
    "id": "number",
    "userId": "number",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```

### Create Category
- **Endpoint**: `POST /categories`
- **Description**: Create a new category
- **Authorization**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "number",
    "userId": "number",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```

### Update Category
- **Endpoint**: `PUT /categories/:id`
- **Description**: Update a category
- **Authorization**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Category updated successfully",
    "category": {
      "id": "number",
      "userId": "number",
      "name": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  }
  ```

### Delete Category
- **Endpoint**: `DELETE /categories/:id`
- **Description**: Delete a category
- **Authorization**: Required (Admin only)
- **Response**:
  ```json
  {
    "message": "Category deleted successfully"
  }
  ```

## Articles

### Get All Articles
- **Endpoint**: `GET /articles`
- **Description**: Get all articles with filtering and sorting options
- **Authorization**: Not required
- **Query Parameters**:
  - `articleId`: Filter by article ID
  - `userId`: Filter by user ID
  - `title`: Search in title
  - `category`: Filter by category ID
  - `startDate`: Filter articles created after this date (YYYY-MM-DD)
  - `endDate`: Filter articles created before this date (YYYY-MM-DD)
  - `sortBy`: Sort by field ('createdAt', 'title', 'length')
  - `sortOrder`: Sort order ('asc' or 'desc')
- **Response**:
  ```json
  [
    {
      "id": "number",
      "userId": "number",
      "categoryId": "number",
      "title": "string",
      "content": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "User": {
        "id": "number",
        "username": "string"
      },
      "Category": {
        "id": "number",
        "name": "string"
      }
    }
  ]
  ```

### Get Article by ID
- **Endpoint**: `GET /articles/:id`
- **Description**: Get article by ID
- **Authorization**: Not required
- **Response**:
  ```json
  {
    "id": "number",
    "userId": "number",
    "categoryId": "number",
    "title": "string",
    "content": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "User": {
      "id": "number",
      "username": "string"
    },
    "Category": {
      "id": "number",
      "name": "string"
    }
  }
  ```

### Create Article
- **Endpoint**: `POST /articles`
- **Description**: Create a new article
- **Authorization**: Required
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "categoryId": "number"
  }
  ```
- **Response**:
  ```json
  {
    "id": "number",
    "userId": "number",
    "categoryId": "number",
    "title": "string",
    "content": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
  ```

### Update Article
- **Endpoint**: `PUT /articles/:id`
- **Description**: Update an article
- **Authorization**: Required (Owner or Admin)
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "categoryId": "number"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Article updated successfully",
    "article": {
      "id": "number",
      "userId": "number",
      "categoryId": "number",
      "title": "string",
      "content": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  }
  ```

### Delete Article
- **Endpoint**: `DELETE /articles/:id`
- **Description**: Delete an article
- **Authorization**: Required (Owner or Admin)
- **Response**:
  ```json
  {
    "message": "Article deleted successfully"
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Something went wrong!",
  "error": "Error details (only in development mode)"
}
```
