## Issue Tracker
Demo Project building a simple issue tracker application

## Introduction
*  **`Issue-Tracker`** is a JavaScript application.
*  It has the following features;
  *  Login via email.
  *  Super admin assigns user to department.
  *  Super admin assigns admin to department.
  *  Users raise issue based on issue description, priority etc.
  *  When an issue is raised, an admin user based on the department gets notified and assigns the issue.
  *  The admin marks the issue as resolved or in-progress.
  *  The admin can see all open and closed issues.

## Dependencies

### Back End Dependencies
*  This app's functionality depends on multiple packages including;
  *  **[Node.js(http://nodejs.org)** - ] - Node.js is an open-source, cross-platform JavaScript runtime environment for developing a diverse variety of tolls and applications.
  *  **[Express](http://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  *  **[Firebase](https://firebase.google.com/)** - Firebase is a mobile and web application platform with tools and infrastructure designed to help developers build high-quality apps. 

## Front End Dependencies
*  **[JavaScript](https://www.javascript.com/)** - JavaScript (JS) is a lightweight, interpreted, programming language with first-class functions.
*  **[CSS](http://css.com/)** - The app's login and dashboard templates have been styled using this CSS framework
*  **[BootStrap](https://getbootstrap.com/)** - This framework helped to make the site responsive.
*  **[JQuery](https://jquery.com)** - This library was used to make a responsive user interface.

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using CLI;

    >`git clone https://github.com/EmmaTope/bc-18-issue-tracker-project.git`

  *  Using HTTP;

    >`https://github.com/EmmaTope/bc-18-issue-tracker-project.git`

*  Navigate to the repo's folder on your computer
  *  `cd bc-18-issue-tracker-project/`
*  Create a .env file and copy the contents of the .env.sample file to it.
*  Fill in the appropriate values gotten from firebase for the keys in the .env file
  *  `npm install`
      You also need to have **node** and **git** installed on your system.

* Run the app
  *  `node app.js` 
