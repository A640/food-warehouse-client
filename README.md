# food-warehouse-client

## Brief Description

We want to design an application that will support and facilitate the process of managing a food warehouse.
This is the `client-side` of our application.

The aim of the project is to design and create a management system for
food warehouse. It should facilitate warehouse management
through the possibility of checking the inventory levels of individual products,
handling orders, issuing invoices, displaying alerts on situations such as e.g.  low inventory levels of a given product or ending expiration date, generating sell statistics, avoiding food expiry by automatic discount applying for products with short expiration dates,
simplifying and improving contact with the customer by enabling him to place and manage orders
directly in the program as well as tracking the status of every order.

## Table of contents

- [Food warehouse project description](#food-warehouse-project-description)
  - [Introduction](#introduction)
  - [Creators and their roles in project](#creators-and-their-roles-in-project)
  - [Technologies](#technologies)
  - [Features](#features)
      - [As guest user](#as-guest-user)
      - [As customer](#as-customer)
      - [As employee](#as-employee)
      - [As manager](#as-manager)
      - [As admin](#as-admin)
      - [As delivery man](#as-delivery-man)
      - [System features](#system-features)
- [Installation and usage](#installation-and-usage)
- [Screenshots](#screenshots)
 


# Food warehouse project description

## Introduction

This project was created as final project for The Object-Oriented Technology and Database Systems classes. It was created by 2 people in about a month (in our free time).


## Creators and their roles in project

**[Albert Kanak](https://github.com/A640)**

- front-end side of project ([client app](https://github.com/A640/food-warehouse-client))
- help with database (planning and help with managing)

**[Kamil Bałaban](https://github.com/GieeFoR)**
- back-end side of project ([server app](https://github.com/A640/food-warehouse-server))
- database


## Technologies

#### Front-end

- web programming (JavaScript + HTML + CSS)
- Vue.js
- Vuex store
- Vue router

#### Back-end

- Java
- Spring Boot
- REST API

#### Database

- MySQL database
- PL/SQL Procedures


## Features

#### As guest user

- register
- view the offer of products in warehouse
- search for a product
- view product details

#### As customer

- order products from warehouses' e-store
- check order status
- view order history
- view order details
- submitting a complaint
- cancel order (if order completing has not started yet)

#### As employee

- enter inbound delivery to the system
- check the stock of a product
- view orders
- receive automatic system alerts (`low stock of a product`, `ending expiry date of a product`)
- change order status (change to: `order completing`, `ready for delivery`)
- send and receive messages to other employees (employees, managers, admins and delivery men)


#### As manager

- perform CRUD operations on `vehicles`, `warehouses`, `food suppliers`, `products`
- view employees and customers details
- view statistics
- view orders
- receive automatic system alerts (`low stock of a product`, `ending expiry date of a product`)
- send and receive messages to other employees (employees, managers, admins, and delivery men)
- issue a decision for complaint


#### As admin

- perform CRUD operations on any entity
- manually start system tasks
- send and receive messages to other employees (employees, managers, admins and delivery men)


#### As delivery man

- view assigned vehicle details
- view assigned order delivery details
- change order status (change to: `out for delivery`, `delivered`, `returned`)
- send and receive messages to other employees (employees, managers, admins and delivery men)

#### System features

- filter products in store and search for a product
- automatically apply discount for a product batch with short expiration term
- automatically generate statistics (e.g. `best-selling products`, `profit from sales`, `number of orders over time`)
- automatically generate alerts (e.g. `short expiration date`, `low inventory level of a product`, `product expired`)
- automatically remove expired products from store
- give hints when user enters data (e.g. some data autocompletion when entering new batch data)





## Installation and usage

### Project setup
1. clone or download project
2. install all dependencies with:
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```



## Screenshots
### UI is currently in Polish
  
**E-store page**
[![click here to view image](https://drive.google.com/uc?export=view&id=1wmV6u75OwwszGjMTOHcBvEJtEiPY96kJ)](https://drive.google.com/uc?export=view&id=1wmV6u75OwwszGjMTOHcBvEJtEiPY96kJ)

  
**Product details**
[![click here to view image](https://drive.google.com/uc?export=view&id=1Z3jHr_Cc--6NIIqqUrjwZYRDy2lu_eac)](https://drive.google.com/uc?export=view&id=1Z3jHr_Cc--6NIIqqUrjwZYRDy2lu_eac)

  
**Product details mobile**
[![click here to view image](https://drive.google.com/uc?export=view&id=11Gs6RrQvMruVnnHDUO4gjeehthJOGFWl)](https://drive.google.com/uc?export=view&id=11Gs6RrQvMruVnnHDUO4gjeehthJOGFWl)

  
**Cart**
[![click here to view image](https://drive.google.com/uc?export=view&id=1FG9Zswt9QQEyuHj5qXPpdyvdc3IB7Z4s)](https://drive.google.com/uc?export=view&id=1FG9Zswt9QQEyuHj5qXPpdyvdc3IB7Z4s)
[![click here to view image](https://drive.google.com/uc?export=view&id=1f6Qwn27HW3yH1a_B7hKhVfMat5UK2PwI)](https://drive.google.com/uc?export=view&id=1f6Qwn27HW3yH1a_B7hKhVfMat5UK2PwI)
[![click here to view image](https://drive.google.com/uc?export=view&id=1boJmEzQ1UXb25MeEW_ZFmbGsJywQOdlx)](https://drive.google.com/uc?export=view&id=1boJmEzQ1UXb25MeEW_ZFmbGsJywQOdlx)

  
**Manager panel**
[![click here to view image](https://drive.google.com/uc?export=view&id=1EDxipDEN7gCPR5HOiw6bChV7QCcYDY-5)](https://drive.google.com/uc?export=view&id=1EDxipDEN7gCPR5HOiw6bChV7QCcYDY-5)

  
**Manager product list**
[![click here to view image](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)

  
**Stats**
[![click here to view image](https://drive.google.com/uc?export=view&id=1KWPUh1sJH-o47v5pGKjcbSPcSyLO7gaY)](https://drive.google.com/uc?export=view&id=1KWPUh1sJH-o47v5pGKjcbSPcSyLO7gaY)
[![click here to view image](https://drive.google.com/uc?export=view&id=1L2-9qfCjSgHfMC8qxZjgv9CCqM_agffU)](https://drive.google.com/uc?export=view&id=1L2-9qfCjSgHfMC8qxZjgv9CCqM_agffU)
[![click here to view image](https://drive.google.com/uc?export=view&id=1AwLwZXmLQyZrxzmPPSxAc4XejzI94jV9)](https://drive.google.com/uc?export=view&id=1AwLwZXmLQyZrxzmPPSxAc4XejzI94jV9)

  
**Product list**
[![click here to view image](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)

  
**Add new product**
[![click here to view image](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)](https://drive.google.com/uc?export=view&id=1mFS_HFajuNMLxMMnvqbsdC32LJzLT1Zm)

  
**Admin panel**
[![click here to view image](https://drive.google.com/uc?export=view&id=1_JXdPYMRz8S1wI1V-fKiWYgGs-QVUlET)](https://drive.google.com/uc?export=view&id=1_JXdPYMRz8S1wI1V-fKiWYgGs-QVUlET)



