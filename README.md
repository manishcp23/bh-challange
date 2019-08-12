# BH Take Home Challenge (back-end)

##### Routing         : Express
##### ORM Database    : Sequelize
##### Authentication  : Passport, JWT
##### Logger  : Morgan

## Installation

#### Download Code | Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
npm install
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application


## Request body For create user

{
"FName" : "Test",
"LName" : "User",
"organizationId": 1,
"roleId": 1,
"Email": "test@email.com",
"password": "abc123"
}

