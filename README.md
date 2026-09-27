# MIUN Samiska Ordbok / Sámi Word Database
A web application for exploring and managing a database of Sámi words, nodes, changes, and registered downloads.

The project consists of a Vue.js frontend and a Laravel REST API backend connected to a MySQL-compatible database.

# Project Overview
The application provides a web interface for:
-Searching and browsing Sámi words
-Viewing word information and related nodes
-Searching words by text
-Browsing nodes and their polarity
-Managing changes to the database
-Managing registered downloads
-User registration and login
-Suggesting changes to the database
-Administrative functionality for managing words, nodes, changes, and downloads

The application was developed as part of the research project "Feeling in your own words" at Mid Sweden University (Mittuniversitetet).

### Architecture
The application is divided into three main parts:
Vue.js Frontend -> Vue 3 + Vite + Pinia -> Vue Router 
HTTP / REST API - Laravel Backend->Laravel 10-> Laravel Sanctum->PHP 8.1+  
MySQL - MySQL Database

### Deployment
The current deployment uses:
*Frontend: Netlify
*Backend/API: Render
*Database: MySQL-compatible database - Aiven.io
*Source code: GitHub

The Vue application communicates with the Laravel API through HTTP requests.

### Frontend
The frontend is built with:

*Vue 3
*Vite
**Vue Router
Pinia
*JavaScript
*XLSX

The frontend project is located in the MIUNsampidb_Vue repository/directory.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
