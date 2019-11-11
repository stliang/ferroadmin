# Ferro Admin Service (Node.js)

This is a web service that provides some back-end functionality for the
Ferror Rod web and mobile apps. It is implemented using the
[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) for Node.js.

# Prerequisites

* Node.js 6.0 or higher
* NPM 5.0 or higher

## Application Features

* ID token verificiation
* Firestore access
* Setting and retrieving custom claims on user accounts 

## Testing Locally

1. Download a service account key file from your Firebase project, and place it
   at the root of this Git repository. Rename the file to
   `serviceAccountKey.json`.

    See https://console.firebase.google.com/project/regenfarm-380c2/settings/serviceaccounts/adminsdk

2. Install the dependencies.

```
$ npm install
```

3. Build the server app.

```
$ npm run build
```

4. Get user information

```
npm run user <email>
```

5. Grant user a role

```
npm run grant <anonymous | basic | prime | admin> <email>
```