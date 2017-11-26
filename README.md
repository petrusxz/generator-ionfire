# generator-ionfire [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Create simple Ionic App integrated with Firebase

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ionfire using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ionfire
```

Then generate your new project:

```bash
yo ionfire
```

Then, install Ionic and Cordova to be able to run the project.

```bash
npm install -g cordova ionic
```

## Requirements

Before we get started with our template generation, make sure to create your project on [Firebase] (https://console.firebase.google.com/u/0/) and add the platforms for the app authentication.

Remember to activate the authentication methods (Email/Password, Google and Facebook).

You'll also have to activate the Cloud Firestore in the Database tab to be able to run the app.

Consult the [Firebase Documentation] (https://firebase.google.com/docs/), just in case.

## Getting Started with your ionfire Project

After the install all the requirements, you now can run your project:

```bash
ionic serve
```

To test the native stuff on the project as the Google and Facebook authentication, run the following commands:

```bash
ionic cordova add platform android ios
ionic cordova run android
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Petrus Cyrino](https://github.com/petrusxz)


[npm-image]: https://badge.fury.io/js/generator-ionfire.svg
[npm-url]: https://npmjs.org/package/generator-ionfire
[travis-image]: https://travis-ci.org/petrusxz/generator-ionfire.svg?branch=master
[travis-url]: https://travis-ci.org/petrusxz/generator-ionfire
[daviddm-image]: https://david-dm.org/petrusxz/generator-ionfire.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/petrusxz/generator-ionfire
