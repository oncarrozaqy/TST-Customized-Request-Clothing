# Choose our version of Python
FROM python:3

# Set up a working directory
WORKDIR /API

# Copy just the requirements into the working directory so it gets cached by itself
COPY ./requirements.txt /API/requirements.txt

# Install the dependencies from the requirements file
RUN pip install --no-cache-dir --upgrade -r /API/requirements.txt

# Copy the API into the working directory
COPY . /API 

# Tell uvicorn to start spin up our API, which will be running inside the container now
CMD ["uvicorn", "core:app", "--host", "0.0.0.0", "--port", "80"]

RUN pip install fastapi uvicorn