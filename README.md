# Auth0 Quickstart Application Theme

A theme for the Auth0 Quickstart applications based on [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/).

## Installation

Install the theme from the CDN:

```html
<link rel="stylesheet" href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css" />
```

As the theme is based on Bootstrap 4, you will also need to include Bootstrap's CSS:

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```

As well as the JavaScript assets if you are not using a library such as [Reactstrap](https://reactstrap.github.io/) or [Bootstrap Widgets for Angular](https://ng-bootstrap.github.io/#/home):

```html
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
```

> **Note**: The intended use for this library is for the Auth0 QuickStart projects, which _do_ make use of JavaScript-enabled components, and so jQuery will need to be installed.

## Building Assets

To build the CSS assets into the `dist/` folder, use:

```bash
npm run build
```

This will then compile SCSS files into CSS, and minify the file to produce a production-ready version.

## Implementing the Custom Theme

Please read the [implementation guide](https://github.com/auth0-samples/samples-bootstrap-theme/wiki/Implementing-the-Design) for integrating this theme into a project.

## Version Information

This project uses the [Semver scheme](https://semver.org/) to manage versioning.

## Contributing

To contribute to this repository, please first read [the contributing guidelines](docs/CONTRIBUTING.md).



