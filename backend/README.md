# pr7-zentratech-dev-test-backend

## Overview

The Django backend project is designed to support a web application that facilitates user interactions through interest messages and chat functionality. The key features of the backend include:

- **Interest Messaging**: Users can send interest requests to other users. These request can be accepted or rejected by the recipient.
- **Chat Functionality**: If an interest request is accepted, both users can initiate and participate in a chat with each other.

The backend will be built using Django, providing a robust framework for handling user authentication, message processing, and chat management. The Django project will expose RESTful APIs to interact with the frontend application, enabling seamless communication and data management.

## Steps to run backend server app in development mode

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/anirudhasj441/pr7-zentra-dev-test
   ```

1. **Navigate to the Project Directory**:
    ```bash
    cd pr7-zentra-dev-test/backend
    ```
    
1. **Create a Virtual Environment** (if not already created):
    ```bash
    python -m venv venv
    ```

1. **Activate the Virtual Environment**:
    - On Windows
        ```bash
        .\venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source ./venv/bin/activate
        ```

1. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

1. **Apply Database Migrations**:
    ```bash
    python manage.py migrate
    ```

1. **Create a Superuser** (if needed):
    ```bash
    python manage.py createsuperuser
    ```

1. **Run the Development Server**:
    ```bash
    python server.py
    ```
1. **Access the Application**: <br>
    - Open your web browser and go to http://127.0.0.1:8000/ to view the application. <br>
    - The Django admin interface is available at http://127.0.0.1:8000/admin/.
1. **Run test cases**:
   ```bash
   python manage.py test app
   ```
**Note**: Ensure that you have the frontend project running as well. For instructions on starting the frontend, refer to the [frontend project's README](../frontend/README.md).

**Additional Note**: Redis server should be up and running at port 6379. You can start Redis using the following command if it's not already running:
```bash
redis-server
```

## Source Code Documentation

For detailed source code documentation, including class and method descriptions, please refer to the generated Doxygen PDF.

You can find the documentation at the following location:

- [Doxygen Documentation](./docs/pr7-zentratech-test-sourc-doc.pdf)
