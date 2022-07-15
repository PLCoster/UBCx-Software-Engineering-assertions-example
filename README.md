# UBCx Software Engineering

## 3. Testing

### Assertions Example

This is a repo to fill in for the missing project repo for the Assertions Example in the Testing module of the UBCx Software Engineering course. This repo contains two projects, a starter project that can be used to follow along with the course video in a code-along style, and a finished solution project.

To use these projects, first Node and the Node Package Manager (npm) must be installed, which is best done with a Node version manager like nvm. See here for example installation details: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Once these are installed, clone or download this repo, then open the desired project folder (starter or solution). While in a project folder (containing a `package.json` file), the required dependencies can be installed by entering in the terminal:

`npm i`

After the dependencies have been installed the test suite can be run using:

`npm run test`

And code coverage metrics can be run using:

`npm run coverage`

After running the coverage tests, a `coverage` folder will be created inside the project. Inside this, there is an `index.html` file which you can open to view more detailed coverage information. (This may require you to install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code to allow it to be viewed properly (right click on `coverage/index.html` -> Open with Live Server), or otherwise open the `index.html` file in your browser)
