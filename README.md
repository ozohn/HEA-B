##HEA-B

H-SENS server repository

## Terms 

- Authentication
	- Who are you?
	- signing in / signing out/ verifying passwords

- Authorization
	- Who can see what
	- Permissions / Access Control

- Form-based
	- email/password stored in DB

- OAuth
	- Login w/ Facebook, Twitter, Github, Google

- Single Sign-On
	- OneLogin
	- Enterprise systems

- Many more...

## Synonyms

"Signup" === "Sign up" === "Register" === "Join" === "Create Account"
"Signin" === "Sign in" === "Log in" === "Login"
"Signout" === "Sign out" === "Log out" === "Logout"

## Signing Up

client --(HTTP POST)--> Server

POST /signup HTTP/1.1
Host: www.example.org

email=joe@example.com&password=pass

server --(some code)--> DateBase

Users().where({
	email: 'joe@example.com'
})

// watching tom scott hashing password

- Check that the email is not in use
- Hash the user's password(w/ BCrypt)
- Store the email / hashed password in the database

## Signing In



# Auth for Newbs(Check List)

Add JWT-based authentication to a Node/Express/Mongo app

## Authentication
* [ ] Create Server
* [ ] Add auth router
* [ ] Create user with POST /auth/signup
  * [ ] validate required fields
  * [ ] Check if email is unique
  * [ ] hash password with bcrypy
  * [ ] insert into db
* [ ] Login user with POST /auth/login
  * [ ] check if email in db
		* [ ] compare password with hashed password in db
		* [ ] Create and sign a JWT
			* [ ] Respond with JWT
* [ ] Create login form; show errors; redirect;
	* [ ] validate required fields
* [ ] Create sign up form; show errorsl redirect;
	* [ ] Validate required fields

### Authorization

* [ ] Visitors can only see the homepage
	* [ ] isLoggedIn middlewate
		* [ ] Validate JWT in header
			* [ ] set req.user to be JWT payload
		* [ ] send an unauthorized error message
	* [ ] redirect to login form
* [ ] Logged in users can only see their page
	* [ ] allowAccess middleware
		* [ ] id in url must match id in req.user
		* [ ] send an unauthorized error message
	* [ ] redirect to user page if they visit the homepage
		* [ ] set user_id in localStorage after login/signup
* [ ] Add Get /auth/logout to clear user_id cookie
	* [ ] redirect to login page

## STRETCH

## Admin Page:
* [ ] Admin page that lists all users
	* [ ] admin table with user_id
	* [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
	* [ ] Prevent brute force logins