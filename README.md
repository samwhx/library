# Client

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

# Server

## Endpoint: '/api/books'
> Only accepts GET requests.

1. No querystring or params.

```Bash
'/api/books'
```
Returns id, author, title, image names of all books in the server.

2. Querystring with empty name and title

```Bash
'/api/books?name=&title='
```
Returns id, author, title, image names of all books in the server.

3. Querystring with filled name and title

```Bash
'/api/books?name=harry&title=harry'
```
Returns id, author, title, image names of all books in the server where first or last name of author contains harry, or title of book contains harry.

4. Params with id of book

```Bash
'/api/books/1'
```
Returns id, author, title, image names of all books in the server where id is 1.

For images, format is in `.jpg` format. e.g.`image.jpg`. To retrieve the image, go to `'/'` e.g. `'/image.jpg'`
