# Web App Gallery API

API for the web app gallery.

## Installation

### Clone the repo

with you're preferred method, I tend to like the github cli tool for cloning and creating repos

```bash
gh repo clone the-HTML-5/web_app_gallery
```

### Variable setup

Create a `packages/server/.env` file and fill in following required variables:

```
DATABASE_URL=mongodb://your.local.mongo/someDBname
COOKIEKEY=aSecretKey
JWT_SECRET=oneMoreSecret
```

I generate secrets using the following command from terminal:

```bash
openssl rand 256 | base64
```

---

### Install server dependencies

```bash
npm i
```

## Usage

development server can be launched by calling

```bash
npm run dev
```

from inside server directory

## Tools for development

- if you're on macOS the [mongo.app](https://github.com/MongoApp/MongoApp) makes launching database a breeze (not sure if theres a windows equivalent)
- manually testing endpoints i prefer using [insomnia](https://insomnia.rest) the free version should be more than sufficient. [postman](https://www.postman.com) is probably more popular and feature rich. [hoppscotch](https://hoppscotch.io) is web based, i've not used it but was previously called postwoman

## Documentation

checkout `feat/swagger` branch, run the dev server and goto `http://localhost:3000/api/docs`
