FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN apt update

RUN apt install curl -y

CMD python3 generate_load.py

EXPOSE 80