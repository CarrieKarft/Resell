# RESELL 

  Resell is an application where users can post items for sale, place bids on products, and comment on products. After a set amount of time, the highest current bid on a product will be the winning bid. When a user has won a bid on a product, the product will show up in their user profile, and the product will no longer be able to accept bids. If there are no bids on a product when the set time is up, the product will be deleted. Users are able to sign up or log in to an existing account on the login page. From there, they can scroll through products to interact with them by commenting, placing new bids, and updating current bids. Users are able to update and delete their own comments on products as well.

  PLEASE NOTE: Currently, the time that a product is available to be bid on is handled by a setTimeout function. This is set to perform an action to either determine a winning bid or delete the product after two minutes so that the app can be presented.

## Features 
  This application uses cokkies and sessions to store, and send user data for user authentication and authorization. 

  The application utilizes AWS S# cloud storage, and ActiveStorage.

  This application utilizeds BCrypt to encrypt user data within a relational database

## Tools

  This server is set up using Ruby on Rails and ActiveRecord. The client portion of the app was created using React JavaScript and CSS.

 The image file storage is handled by AWS S3 cloud service along with ActiveStorage.

## Setup

  Run $bundle install to install gems in Gemfile
  Run $npm install --prefix client to install the dependecies in the package.json file
  Run $rails active_storage:install to create ActiveStorage blob, attachments, and variant records tables
  Run $rails db:migrate to execute the migrations of the currently configured migration directory
  Run $rails db:db:seed to seed dtatbase with example data
  Run $rails server to start server at port (http://localhost:3000)
  Run $npm start --prefix client

  You can access the client in a browser with the URL http://localhost:4000, or you can view the json data returned from the API by visiting http://localhost:3000/specified-route in Postman
    
## Resources

- [create-react-app][]
- [dbdiagram.io][]
- [Postman][postman download]

[create-react-app]: https://create-react-app.dev/docs/getting-started
[create repo]: https://docs.github.com/en/get-started/quickstart/create-a-repo
[dbdiagram.io]: https://dbdiagram.io/
[postman download]: https://www.postman.com/downloads/
[network tab]: https://developer.chrome.com/docs/devtools/network/
[ActiveStorage]: https://guides.rubyonrails.org/active_storage_overview.html

Some additonal resources I used:

  A blog post about setting up AWS S3 for ActiveStorage by: Taylor Huffman: https://medium.com/@taylor_8332/active-storage-aws-s3-and-render-a-step-by-step-setup-guide-fd77824bc010

  A YouTube tutorial on setting up ActiveStorage for a React and Rails application: https://www.youtube.com/watch?si=cbDQjo5PoDoRwG8Y&v=_rLMRd676-I&feature=youtu.be


## Description

This project is scaffolded so that you can build a React frontend and Rails
backend together, and easily deploy them to Render.

**Note**: if you are not planning to deploy your app to Render and prefer to use
SQLite, you will need to make the following changes in the project files:

1. In the `Gemfile`, replace `gem 'pg', '~> 1.1'` with `gem 'sqlite3', '~>
   1.4'`.
2. In the `database.yml` file, change the line `adapter: postgresql` to
   `adapter: sqlite3`.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

