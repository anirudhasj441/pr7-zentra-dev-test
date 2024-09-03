import uvicorn

if __name__ == "__main__":
    uvicorn.run("pr7_zentra_test.asgi:application", log_level='debug', access_log=True)