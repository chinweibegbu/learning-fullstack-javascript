# Unit Notes

## Web Basics
### Terms
- HTTP: Hyper Text Transfer Protocol
- HTTPS: Hyper Text Transfer Protocol Secure
- TCP: Transmission Control Protocol
- IP: Internet Protocol
- DNS: Domain Name Server
- HTML: Hyper Text Markup Language
- CSS: Cascading Style Sheet

## HTTP Requests with ES6
JavaScript uses an event loop to handle asynchronous function calls.
```
const generateJson = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.ok) {
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
      changeButton();
    }
  } catch(error) {
    console.log(error);
  }
};
```

Read about Requests from at https://github.com/chinweibegbu/learning-fullstack-javascript/tree/main/learning-js/intermediate-js/requests.

## Authentication and OAuth
*Authentication*: The process used by applications to determine and confirm identities of users

### Client Authentication
- Typically, upon a successful login, the application will respond with an *authentication token* (or auth token) for the client to use for additional HTTP requests. This token is on the user’s computer and generally expires after a certain amount of time.

### Application Authentication
The most basic pattern for API access from another application is using an API key. This is usually a developer key available for request >>> May have the ability to access user data (NOT enterprise friendly)

**SOLUTION**: OAuth API
- OAuth is an open standard
- OAuth allows user verification without sharing login details
- Each API is required to implement their own version of OAuth
- Process:
  1. User selects login with Google, Facebook or Twitter
  2. User is redirected to the selected provider and logs in
  3. User is directed back to the originating application with an *access token*
  4. Users application requests will now include said access token
- OAuth 2 - Common flows include the following:
  - Client Credentials Grant: Submit application's client ID + client secret (strings provided to the application when it was authorized to use the API) to receive an access token (and sometimes a refresh token)
  - Authorization Code Grant: Tied to both user and requesting application. Submit authorization code + application’s client ID + client secret to receive an access token and a refresh token
  - Implicit Grant: Does NOT involve the exchange of client secret and results in an access token (with, typically, no refresh token)