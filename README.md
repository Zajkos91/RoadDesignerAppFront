# Road Designer

![RoadDesignerApp Logo](logo.png)

An application for managing infrastructure projects in Highway & Road Design & Engineering Companies.

## Table of Contents

1. [Introduction](#introduction)
2. [Demo](#demo)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [TODO](#todo)
7. [Contact](#contact)

## Introduction

In the project industry, effective project management is the cornerstone of successful and timely task completion. An application that monitors task progress, approaching deadlines, and assigns specific tasks to individuals is essential in any project office.

## Demo

[![Demo Video](https://img.youtube.com/vi/xPs4Cr-X3pY/0.jpg)](https://www.youtube.com/watch?v=xPs4Cr-X3pY)

## Features

The Road Designer App comes with a wide range of features:

- **Displaying Projects**: Enables the display of projects using a search feature. Each project is integrated with Leaflet Routing to visualize the route.

- **Project Modification**: Upon logging into the admin panel, it is possible to modify the parameters of a specific project.

- **Project Deletion**: Allows for the removal of individual projects.

## Tech Stack

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)
![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![MySql](https://shields.io/badge/MySQL-lightgrey?logo=mysql&style=plastic&logoColor=white&labelColor=blue)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


## Getting Started

### Run Locally

To run The Road Designer App locally, follow these installation steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Zajkos91/RoadDesignerAppFront.git
   git clone https://github.com/Zajkos91/RoadDesignerAppBack.git
   ```

2. Import database:

   ```bash
   https://github.com/Zajkos91/RoadDesignerAppBack/blob/develop/drogowiec_roads.sql
   -implement to your MySql
    ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the app:

    -Backend
   ```bash
   npm start: dev
   ```
    -Frontend
   ```bash
   npm start
   ```

## TODO

- **Fixed Bugs**: there is one error that does not let me rest. Maybe You would like to help me fix it. I explained it in file below. 
    ```bash
   https://github.com/Zajkos91/RoadDesignerAppFront/blob/develop/src/components/Map/SingleRouteLine.tsx
    ```
- **Add validation and errors handlers**: there is a lack of error handling and form validation in many parts of the code. I have wasted a lot of time trying to fix the React leaflet routing errors.   
- **Improve search bar**: to be able to filter by name, designers, year of realisation etc.
- **Modify road record**: to be able to add, remove new tasks in current projects.
- **and many more...**

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-informational?style=social&logo=linkedin)](https://www.linkedin.com/in/pzajkowski91/)

