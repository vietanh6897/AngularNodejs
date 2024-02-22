## Project Name

Task Manager is a web application for managing tasks and projects.

## Table of Contents

- Introduction
- Features
- Requirements
- Installation
- Usage
- Configuration

## Introduction

Task Manager is a full-stack web application built with Nest.js and Angular. It allows users to organize tasks and projects efficiently.

## Features

- User authentication and authorization
- Create, update, delete projects
- Create, update, delete tasks (Kaban board, drag drop)
- Add, remove member into a specific project
- Assign tasks to users
- Responsive design for tablet and desktop

## Requirements

List of prerequisites and dependencies required to run the project.
(Refer - Here is my local environment)
Node.js (v20.11.0)
npm (10.2.4)
Docker (v4.27.2)
Xampp (v3.3.0)

## Installation

There are two way to build & run project locally please follow `Step-by-step` instructions for setting up the project locally.

[`Build with docker`]

# Step 1: Download and Install Docker Desktop

- Download and install at (https://www.docker.com/products/docker-desktop/)
- Start Docker

# Step 2: Clone the repository:

- Select folder where you want to store project.
- Open Git Bash and type `git clone https://github.com/username/project.git`

# Step 3: Open the project directory AngularNodejs by IDE and run dockercompose.yml:

- Open project root folder named AngularNodejs with IDE (visual studio code)
- Open new terminal then type `docker-compose up` to start the Docker containers. This takes you for a while of waiting
- Open DockerDesktop panel to check status of containers, make sure all of them are running

[`Build and run using Xampp`]

# Step 1: Download and Install XAMPP

- Go to the XAMPP website and download the XAMPP installer for your operating system (Windows, macOS, or Linux).
- Run the installer. Once XAMPP is installed, start it.
- Start the Apache and MySQL services from the XAMPP Control Panel.
- Open your web browser and go to http://localhost/phpmyadmin.
- Log in to phpMyAdmin using the default credentials (username: root, password: empty).
- Select `Privileges`, click on `Edit privileges` on the row whose username="root" and hostname="localhost". - Choose `Change password` then enter `admin`.
- Open phpMyAdmin (config.inc.php) in Apache config of Xampp panel. Find and modify as follow
  $cfg['Servers'][$i]['auth_type'] = 'cookie';
  $cfg['Servers'][$i]['user'] = 'root';
  $cfg['Servers'][$i]['password'] = 'admin';
  $cfg['Servers'][$i]['extension'] = 'mysqli';
  $cfg['Servers'][$i]['AllowNoPassword'] = false;

# Step 2: Clone the repository:

- Select folder where you want to store project.
- Open Git Bash and type `git clone https://github.com/username/project.git`

# Step 3: Open the project directory AngularNodejs by IDE and Install dependencies & start project:

- Open new terminal. Navigate to Angular-frontend folder `cd Angular-frontend`
- Run `npm install` then type `npm start`
- Open new terminal. Navigate to Nestjs-backend folder `cd Nestjs-backend`
- Run `npm install` then type `npm start`

# Step 4: Start the project:

`npm start`

## Usage

Access the application in your web browser:

- Application : `localhost:4200`
- Swagger api : `localhost:3000/api`
- phpMyAdmin: `localhost:8080`
  Please note that database `seeding` is run `automatically` for better overview and UI/UX, so you can use following account to login:
- username: User1, password: Aa12345678@
- username: User2, password: Aa12345678@
- username: User3, password: Aa12345678@
- username: User4, password: Aa12345678@
- username: User5, password: Aa12345678@
  And if you want to create more user you can use `Swagger`.

## Configuration

Explanation of any additional configuration options and how to use them.
