"""
@file server.py
@brief Entry point for running the ASGI application with Uvicorn.
@details This script starts the ASGI server using Uvicorn to serve the application 
         defined in the `pr7_zentra_test` module. The server runs with debug logging 
         and access logging enabled.
"""

import uvicorn

if __name__ == "__main__":
    """
    @brief Starts the Uvicorn server to run the ASGI application.
    @details This block is executed when the script is run directly. It launches the 
             Uvicorn server with the specified application and logging configuration.
    """
    uvicorn.run("pr7_zentra_test.asgi:application", log_level='debug', access_log=True)
