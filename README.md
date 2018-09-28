# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Endpoint:
```Bash
'/api/books'
```
> Only accepts GET requests.

1. no querystring or params.
```Bash
'/api/books'
```
returns id, author, title, image names of all books in the server.

2. querystring with empty name and title
```Bash
'/api/books?name=&title='
```
returns id, author, title, image names of all books in the server.

3. querystring with filled name and title
```Bash
'/api/books?name=harry&title=harry'
```
returns id, author, title, image names of all books in the server where first or last name of author contains harry, or title of book contains harry.

4. params with id of book
```Bash
'/api/books/1'
```
returns id, author, title, image names of all books in the server where id is 1.

for images, format is in `.jpg` format. e.g.`image.jpg`. To retrieve the image, go to `'/'` e.g. `'/image.jpg'`
