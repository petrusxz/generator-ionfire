'use strict';
//Require dependencies
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  //Ask for user input
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the simple ' + chalk.red('ionfire') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Project name?',
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'author',
        message: 'The author name?'
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Your package name? (ex: com.companyname.appname)'
      },
      {
        type: 'input',
        name: 'apiKey',
        message: 'Your Firebase API Key?'
      },
      {
        type: 'input',
        name: 'authDomain',
        message: 'Your Firebase Auth Domain?'
      },
      {
        type: 'input',
        name: 'databaseURL',
        message: 'Your Firebase Database URL?'
      },
      {
        type: 'input',
        name: 'storageBucket',
        message: 'Your Firebase Storage Bucket?'
      },
      {
        type: 'input',
        name: 'messagingSenderId',
        message: 'Your Firebase Messaging Sender Id?'
      }
    ];

    return this.prompt(prompts)
      .then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  }

  writing() {
    var toCopy = [
      "./src/app/app.component.ts",
      "./src/app/app.html",
      "./src/app/app.module.ts",
      "./src/app/app.scss",
      "./src/app/main.ts",
      "./src/assets/icon/favicon.ico",
      "./src/assets/imgs/logo.png",
      "./src/pages/home/home.html",
      "./src/pages/home/home.module.ts",
      "./src/pages/home/home.scss",
      "./src/pages/home/home.ts",
      "./src/pages/item/item.html",
      "./src/pages/item/item.module.ts",
      "./src/pages/item/item.scss",
      "./src/pages/item/item.ts",
      "./src/pages/login/login.module.ts",
      "./src/pages/login/login.scss",
      "./src/pages/login/login.ts",
      "./src/pages/register/register.html",
      "./src/pages/register/register.module.ts",
      "./src/pages/register/register.scss",
      "./src/pages/register/register.ts",
      "./src/theme/variables.scss",
      "./src/manifest.json",
      "./src/service-worker.js",
      "./.editorconfig",
      "./.gitignore",
      "./tsconfig.json",
      "./tslint.json",
    ];

    var toCopyTpl = [
      "./src/app/app.firebase.config.ts",
      "./src/pages/login/login.html",
      "./src/index.html",
      "./ionic.config.json",
      "./package-lock.json",
      "./package.json",
    ];

    var i;
    for (i = 0; i < toCopy.length; i++) {
      this.fs.copy(this.templatePath(toCopy[i]), this.destinationPath(toCopy[i]));
    }
    for (i = 0; i < toCopyTpl.length; i++) {
      this.fs.copyTpl(this.templatePath(toCopyTpl[i]), this.destinationPath(toCopyTpl[i]), this.props);
    }
  }

  install() {
    this.npmInstall();
  }
}
