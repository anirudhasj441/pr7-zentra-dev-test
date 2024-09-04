# pr7-zentra-dev-test

## Overview

This web application allows users to send interest messages to other users. The recipient can then accept or reject the interest, and if accepted, both users can chat with each other. The project utilizes Django for the backend and React for the frontend.

## Core Features
- **User Authentication**: Implement a simple user authentication system where users can register and log in using JWT tokens for authentication.
- **Sending Interests**: Allow logged-in users to browse a list of other users and send an interest request to any user.
- **Accepting/Rejecting Interests**: Provide functionality for users to view received interest requests and accept or reject them.
- **Chat System**: If an interest request is accepted, enable a chat interface where both users can send and receive messages in real-time.

## Dependencies
- ### Backend
  - `python3.12`
  - `redis-server7.2.4`
  
- ### Frontend
  - `Node 20.17.0`

## Setup and Running
### Running the Backend
For detailed instructions on setting up and running the backend, please refer to the [Backend README.md](./backend/README.md). Ensure that the `redis-server` is up and running at port `6379`.

### Running the Frontend
For detailed instructions on setting up and running the frontend, please refer to the [Frontend README.md](./frontend/README.md).

## Documentation
For detailed API documentation, refer to the 
- [Doxygen-generated PDF](./backend/docs/pr7-zentratech-test-sourc-doc.pdf
).
