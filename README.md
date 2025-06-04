# Average Calculator HTTP microservice

A REST API service that calculates averages of different types of numbers.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```env
PORT=9876
WINDOW_SIZE=10
THIRD_PARTY_BASE_URL=URL
CLIENT_ID=your_client_id
CLIENT_SECRET=
ACCESS_CODE=
REQUEST_TIMEOUT=500
ACCESS_TOKEN=
TOKEN_EXPIRY=
```

## Running the Service

```bash
npm start
```

The service will start on port 9876 (or the port specified in your .env file).

## API Endpoints

### Check Service Status
```http
GET /ping
```
Response:
```json
{
    "message": "Average Calculator Microservice is running!",
    "timestamp": "2025-06-04T06:36:27.998Z",
    "windowSize": 10
}
```

### Get Number Sequences
```http
GET /numbers/{type}
```

Where `{type}` can be:
- `p` - Prime numbers
- `f` - Fibonacci numbers
- `e` - Even numbers
- `r` - Random numbers

Example Request:
```http
GET /numbers/e
```

Example Response:
```json
{
    "windowPrevState": [],
    "windowCurrState": [2, 4, 6, 8],
    "numbers": [2, 4, 6, 8],
    "avg": "5.00"
}
```

### Set Authentication Token
```http
GET /set-token
```
Sets the authentication token for third-party API calls.

## Configuration

- `PORT`: Server port (default: 9876)
- `WINDOW_SIZE`: Size of the sliding window (default: 10)
- `REQUEST_TIMEOUT`: API request timeout in milliseconds (default: 500)
- `THIRD_PARTY_BASE_URL`: URL of the third-party number service
- `CLIENT_ID`: Client ID for authentication
- `CLIENT_SECRET`: Client secret for authentication
- `ACCESS_TOKEN`: JWT token for API access
- `TOKEN_EXPIRY`: Token expiration timestamp

## Dependencies

- Express.js
- Axios
- Dotenv
- Nodemon (development)

### API Testing Results

![Screenshot 2025-06-04 122103](https://github.com/user-attachments/assets/2c4d9a75-bd5a-4437-9d00-d61677b929b7)

![Screenshot 2025-06-04 124615](https://github.com/user-attachments/assets/a65d433f-aa84-4b54-ab86-27a47f7eb86c)

