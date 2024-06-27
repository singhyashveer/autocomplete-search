
# Auto Complete Search

In this mini project there is an input field. If you type something in that input field, It will give you some suggestion based on data stored in *data.json* file. If you click on these suggestion, a card will be added to the web page, which contains title, summary and author.


## Installation
Clone project
```bash
git clone https://github.com/singhyashveer/autocomplete-search.git
```

To Run Backend:
Go inside **autocomplete-search-backend** Folder:
```bash
cd autocomplete-search-backend
```
Build Docker Image
```bash
docker build -t backend:dev .
```
Run Docker image:
```bash
docker run -p 5000:5000 backend:dev
```
Backend is running, Now run frontend:
Go inside **autocomplete-search-frontend** 

```bash
cd autocomplete-search-frontend
```
Build Docker Image
```bash
docker build -t frontend:dev .
```
Run Docker image:
```bash
docker run -p 3000:3000 frontend:dev
```
Frontend is also running. Now access application through *http://localhost:3000/*




