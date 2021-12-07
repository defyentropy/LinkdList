# LinkdList

[Video Demo](https://youtu.be/kw629pNTLtE)

## Description

All modern browsers come with bookmarks, but this tool isn't very helpful. Although one can organise bookmarks into folders, there is no option to search through them, or add tags and descriptions to the bookmarks.

LinkdList is a web app that allows a user to organise links into different lists. Each link contains data about its:

- Title
- Description
- The actual hyperlink
- Type (video or webpage)
- Creator of the resource
- Tags

Two other pieces of metadata on each link are the ID of the list it belongs to and the email of the user who created it.

## Tech stack

LinkdList is built with Next.js, a framework for React.js. For styling, I used Tailwind CSS. Because it uses a utility-class approach to styling, it is easier to customise the UI and make it look different from UI libraries like Bootstrap. Mongoose is used to connect to the MongoDB database. The other packages that arre used are:

- `formik` - to manage forms
- `yup` - to manage validation for said forms

I used Formik and Yup because making forms in React is very verbose, since you have to set up state for each input and link it to the `input`s with `value` and `onChange` props. Formik and Yup make it easier to implement forms.

- `axios` - to make sending GET, POST and PUT requests easier.

For authentication, I used Auth0, since authentication is a critical but complicated part of an application and I wanted to make sure it was handled properly. Auth0 was extremely easy to set up and use, and has an intuitive UI for managing auth rules and users.

For exact version numbers, check `package.json` or `package-lock.json`.

## File structure and Code

### 📁 components

This directory contains UI elements that are often reused across different pages, to avoid code redundancy and to make it easier to edit them.

1. **AppBar.js** - The NavBar at the top of every page in LinkdList. Displays the app logo and, depending on the user's login state, displays either a login button or a profile picture and logout button.
2. **ErrorAlert.js** - A component that displays a small red snackbar-style alert when an error occurs in the backend. Takes a bit of state in from the parent page to tell it when an error has occured. If there is an error, it displays; otherwise, it is hidden. To make this work, the API only returns 200 OK statuses, because otherwise axios throws an error and the callback is not fully executed.
3. **ErrorCard.js** - A component that is rendered to the page whenever a user tries to access a list or edit a link that is not theirs.
4. **FormField** - An input component whose color can be customised by passing it as a `color` prop.
5. **GroupCard.js** - A card component to display the details of each list on the user's dashboard.
6. **Layout.js** - A component that wraps every page to ensure that each page displays the AppBar.
7. **LinkCard.js** - A card component to display all the details of a link.

### 📁 icons

Contains SVG icons that are used in LinkdList.

### 📁 lib

Contains helper functions.

1. **dbConnect.js** - Allows LinkdList to connect to the MongoDB database by establishing a connection through mongoose.
2. **tags.js** - Contains functions related to the tags on links. The first one converts a comma-separated string of tags into an array for storage in the DB, and the second one converts an array of tags into a comma-separated string.

### 📁 models

Contains mongoose models for links and lists. Basically, a model defines the shape of each data entry: the fields it should have and the constraints on each field.

### 📁 pages

Contains all the pages that make up the main part of the application.

**\_app.js**

Contains the entry point of the application for Next.js. The Auth0 `UserProvider` context is initialised in this file.

**404.js**

Contains a 404 page that Next.js automatically redirects the user to if they visit a route that does not exist.

**acount.js**

An account page where users can see their details, like their profile picture, their email and whether their email is verified.

**dashboard.js**

The user's homepage. Displays all the lists that the user has created.

**index.js**

The landing page for LinkdList.

### 📂📂 /api

Contains the code for each of the API endpoints for LinkdList.

**/auth/[...auth0].js**

Contains setup code for the Auth0 login and logout handlers. **Must not be edited**.

**/create**

1. **group.js** - API endpoint to allow a user to create a new list
2. **link.js** - API endpoint to allow a user to create a new link

**/group/[id].js**

Implements functionality for updating (PUT), deleting (DELETE) and fetching the details (GET) of a list.

**/link/[id].js**

Implements functionality for updating (PUT) and deleting (DELETE) links.

### 📂📂 /create

**group.js**

The form page for entering the data for a new group.

**link.js**

The form page for entering the data for a new link. Takes two URL parameters: the ID of the list the link is being added to and the name of the list. If these two params are not provided, the user is redirected to their dashboard.

### 📂📂 /group

**[id].js**

The page that displays all the links belonging to that list. Also has a form for filtering through links based on their tags.

**settings.js**

Allows the user to change the name and description of a list, or allows them to delete it entirely, along with all the links it contains.

### 📂📂 /link/[id]

**edit.js**

Form that allows a user to update a link. It is basically the same as the form to create a link, but prefills the existing details of a link into the form.

### 📁 public

Contains assets for LinkdList, mainly the favicon.

All of the other files in the main project directory are configuration files and do not need to be edited very often.
