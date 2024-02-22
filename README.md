# Project Name

Task Manager is a web application for managing tasks and projects.

# Table of Contents

- Introduction
- Features
- Requirements
- Installation
- Usage
- Configuration

# Introduction

Task Manager is a full-stack web application built with Nest.js and Angular. It allows users to organize tasks and projects efficiently.

# Features

- User authentication
- Create, update, delete projects
- Create, update, delete tasks (Kaban board, drag drop)
- Add, remove member into a specific project
- Assign tasks to users
- Responsive design for tablet and desktop

# Requirements

List of prerequisites and dependencies required to run the project.
(Refer - Here is my local environment)
Node.js (v20.11.0)
npm (10.2.4)
Docker (v4.27.2)
Xampp (v3.3.0)

# Installation

There are two way to build & run project locally please follow `Step-by-step` instructions for setting up the project locally.

[`Build with docker`]

## Step 1: Download and Install Docker Desktop

- Download and install at (https://www.docker.com/products/docker-desktop/)
- Start Docker

## Step 2: Clone the repository:

- Select folder where you want to store project.
- Open Git Bash and type `git clone https://github.com/vietanh6897/AngularNodejs.git`

## Step 3: Open the project directory AngularNodejs by IDE and run dockercompose.yml:

- Open project root folder named AngularNodejs with IDE (visual studio code)
- Open new terminal then type `docker-compose up` to start the Docker containers. This takes you for a while of waiting
- Open DockerDesktop panel to check status of containers, make sure all of them are running

[`Build and run using Xampp`]

## Step 1: Download and Install XAMPP & set up database

- Go to the XAMPP website and download the XAMPP installer for your operating system (Windows, macOS, or Linux).
- Run the installer. Once XAMPP is installed, start it.
- Start the Apache and MySQL services from the XAMPP Control Panel.
- Open your web browser and go to http://localhost/phpmyadmin.
- Log in to phpMyAdmin using the default credentials (username: root, password: empty).
- Select `User accounts` tab, click on `Edit privileges` on the row whose username="root" and hostname="localhost".
- Choose `Change password` then enter `admin`.
- Open phpMyAdmin (config.inc.php) in Apache config of Xampp panel. Find and modify as follow
  $cfg['Servers'][$i]['auth_type'] = 'cookie';
  $cfg['Servers'][$i]['user'] = 'root';
  $cfg['Servers'][$i]['password'] = 'admin';
  $cfg['Servers'][$i]['extension'] = 'mysqli';
  $cfg['Servers'][$i]['AllowNoPassword'] = false;
- Restart the Apache and MySQL services from the XAMPP Control Panel.
- Login with username=`root` and password=`admin`. Create `task_manager` database

## Step 2: Clone the repository:

- Select folder where you want to store project.
- Open Git Bash and type `git clone https://github.com/vietanh6897/AngularNodejs.git`

## Step 3: Open the project directory AngularNodejs by IDE and Install dependencies & start project:

- Open new terminal. Navigate to Angular-frontend folder `cd Angular-frontend`
- Run `npm install` then type `npm start`
- Open new terminal. Navigate to Nestjs-backend folder `cd Nestjs-backend`
- Open `.env` file. And modify `DB_HOST`=`localhost`
- Run `npm install` then type `npm start`

# Usage

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

# Configuration

If you user Docker and encounter problem related to RAM usage because of VmmemWsl consume too many RAM. Then follow these steps:

## Step 1: Create `.wslconfig` file at path `C:\Users\admin`

## Step 2: Copy and paste this code snippet

[wsl2]
memory=1GB
processors=2
localhostforwarding=true

## Step 3: Save the file then restart windown.
