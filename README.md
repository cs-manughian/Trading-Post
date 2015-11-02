# Trading-Post

A MEAN stack web application for trading goods and services with other users.


Features
--------

The usage features of this application include:

o Search for goods and services using a search bar

o Choose a category and/or zipcode to search for goods or services

o Browse most recent posts

o Create an account

o Request/Accept/Reject/Confirm a trade with another user

o Create a wishlist

o Add goods and services to your inventory

o View your profile with your inventory, wishlist, and trades



Installation
------------

If using a local copy, you must install the MEAN stack locally:

1. Install NodeJS
	
   - Open the terminal or command prompt
   - For Ubuntu, run the command: 
		sudo apt-get install nodejs

   - If you get a response with "node" can be found in the following packages, create a symlink:
		sudo ln -s /usr/bin/nodejs /usr/bin/node
		
   - There is also a Windows installer for Node available online:
		http://blog.teamtreehouse.com/install-node-js-npm-windows
	
2. Install MongoDB

   - For Windows, follow the instructions from the MongoDB manual here:
		https://docs.mongodb.org/v2.4/tutorial/install-mongodb-on-windows/

	(For Ubuntu continue here)
   - In the same terminal, run the command:
		sudo apt-get install mongodb
		
   - To verify that the database is installed and running, simply execute  mongo to open the shell:
		mongo

3. Install NPM (Node Package Manager install utility for Node) 

   - For Windows, the reference in step one also has instructions for NPM.

	(For Ubuntu continue here)
   - In the same terminal, run the command:
    	sudo apt-get install npm

4. Install ExpressJS globally so it can be used in each project

   - For Windows, follow the instructions here:
		http://akbarahmed.com/2012/02/05/install-express-for-node-js-on-windows-7/

	(For Ubuntu continue here)
   - In the same terminal, run the command:
    	sudo npm install -g express

5. Run the command "npm install" (without quotes) to install any dependencies

6. Clone the repository from GitHub

7. Run the Trading Post app

   - In the terminal, go into the "myapp" folder in the Trading-Post repository:
		cd myapp

   - Run the following command:
		node server.js

   - If the 'node' command does not work, try using the "nodejs" command (without quotes) instead.

   - Now the Express server should be running. Open a browser and go to URL for tradingpost. Try localhost:3000


Authors
-------
   - Cosi
   - Jessica
   - Mana
   - John
   - Nina


Contribute
----------
   - Submit bugs or feature requests to cs.manughian@gmail.com


Documentation
-------------
   - NodeJS
		https://nodejs.org/en/docs/

   - NPM
		https://docs.npmjs.com/

   - ExpressJS
		http://expressjs.com/guide/routing.html

   - MongoDB
		https://docs.mongodb.org/v2.4/

   - AngularJS
		https://docs.angularjs.org/guide

