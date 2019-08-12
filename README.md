# ENS events reader

This is a simple web page that connects to the blockchain network using the [in3](https://in3.readthedocs.io/en/develop/api-ts.html) client.<br>
Once the connection is established, it allows the user to see the NameRegistered events based on some choices.

## Preriquisites

- Nodejs v10.15.3 or higher
- React v16.9.0
- Typescript 3.5.x or

### Installation

make sure that internal project modules are installed by typing:

    npm install

### How to run

    npm start
will run the project in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to test

after installation of internal project modules (npm install) <br>
run the following command:

    npm test

It will start running three tests:<br>
    1. the render process<br>
    2. connectivity to the network<br>
    3. the process of reading events<br>

ps: [Jest](https://jestjs.io) test framework is used here with an increased timeout to be 50000 milliseconds. The default timeout value 5000 is not suitable for reading events.

### How to build

if you want a production build that works with any static file server, simply invoke the command: <br>

    npm run build

Notice, the build result is not less than 2.8 mb. I suspect the conditional require found in in3 client.
<br>

### Project Structure

The project is organized within 3 folders:<br>
    - <b>models</b> : this will contain interfaces and classes of the project. In addition to data layer if found.<br>
    - <b>controller</b>: this will contain the business logic of the app. Ex: network logic or app controller.<br>
    - <b>view</b>: this will contain react components.<br>
    - <b>lib</b>: this folder container model/view/controller reusable classes. In our case, only the view folder here is useful.<br>
<br>
### Styling

I use standard css files mainly.<br>
The only exception is flexRow which uses inline styles.<br>
I wanted to control the columns at consumption stage of the component. Therefore, I used inline styles here.<br>
For huge projects I recommend [css-in-js](https://github.com/zeit/next.js#css-in-js) solution.
<br>
<br>
### Localization

The structure of the app allows for numerous number of languages. the default ones are English and Deutsch.<br>
The translation file is located in the src/assets folder.<br>
<br>
### Design Patterns used

The Singleton design pattern is used here.<br>
To force only one instance in the app, I hide the class and only export the single instance created.<br>
It is better than other approaches found on the internet.<br>
<br>

### Project Configurations
The file src/config.ts contains the default project configurations.
