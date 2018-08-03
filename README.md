Project Destination App
==========================

## Project Background
The Project Destination Application is built on [VueJS](https://vuejs.org/), created with [Vue CLI 3](https://cli.vuejs.org/), an amazing front end JavaScript framework. Together with [Firebase](https://firebase.google.com/) for database handeling and [Vuesax](https://lusaxweb.github.io/vuesax/) for creating an intuitive nice looking user interface in a simple way. 

Here you will learn how to set upp the project and start developing, after that you will be ready to deploy in a very simple way with `git` together with [TravisCI](https://travis-ci.com) and [Netlify](https://www.netlify.com).

### Project setup
First of all you need to have Node Package Manager installed on you PC or MAC, this is most easily done by going to [NodeJS](https://nodejs.org/en/download/) or by Googling on how to do it for your operating system. Then, to install needed packages run `npm install` from the command line in the project folder. This will install all dependencies listed in `package.json`.

### Start development server
To start server, run `npm run serve`. This will start a development server locally at `localhost:8080`. It will also create a server at `<YOUR-IP-ADRESS>:8080`

### Build application
To build app, run `npm run build`. This will build the application to a minified state which is also deployable, this command is ran automatically on deploy to master so no need for this to be ran unless you want to try running the app somewhere else.

### Linting and tests
To format (lint) and test your application, run `npm run lint` and then `npm run test:unit`. Lint will format your code according to [ESLint-Prettier](https://github.com/prettier/prettier-eslint).

GitHub and git workflow
=======================

To have a unified way of working we will work with these workflow guidelines.
### Creating a branch
In commande line:
`git checkout -m "<YOUR-NAME>/<YOUR-VERY-DESCRIBING-BRANCH-NAME>"`, the branch name should be short and precise to show what area your working in. For example: `soner/ESLint-config` or `erik/installed-firebase-dependency`.

### Commiting changes
After you have done your changes you have to commit your changes to finally be able to deploy. In command line:
run `git status` or `git diff` (exit diff by entering `:q`) to see your changes. 

Then run `git add .` ("." means "all"). This will stage all your changes to commit. You can also add files to stage one by one by specifying the file route like: `git add src/views/shared/sharedfile.vue`. To undo staging run `git reset HEAD~`, this will unstage all staged files (not undo actual changes to files).

After this you are ready to commit your added files, the files you have not added will still remain until you stage and commit them. Run `git commit -m "<MY-VERY-DESCRIBING-COMMIT-MESSAGE>"` here you can describe more in detail what changes you have made.

### Pushing changes to your branch
To push changes run `git push origin <MY-BRANCH-NAME>`
