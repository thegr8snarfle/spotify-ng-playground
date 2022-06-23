# Spotify Playground

Basic foundation for playground app to hit the Spotify Web API. 

## Getting Started

This app uses the OpenID _authorization code flow_ to authenticate a spotify developer account against the Spotify Web API.

To get started: 
1. You'll need a spotify developer account, which can be created here => https://developer.spotify.com/dashboard/login.
2. You'll need to 'create an app'.
3. Within that _app_, you'll need to go *Edit Settings* and add two _Redirect URI's_ that are required for this flow to work (these URI's should match the webpack dev server configuration).
   1. http://localhost:4200/auth/callback
   2. http://localhost:4200/dashboard

More information can be found here => https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
