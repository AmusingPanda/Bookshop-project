# Assignment 1: 

A. Create an express web application for your project.

B. Configure the web application to run on your assigned port number.

C. The web application to be comprised of 3 static pages/views:

    Index
    About
    Contact

D. Populate each static page with some basic content appropriate for your website.

# Assignment 2: 

A.  Define layout with header and footer section content in external files.

B.  Define content display rules of your website using stylesheet.

C.  Add a meaningful appropriately sized logo image on the header section.

D.  Enhance static page with some basic content appropriate for your website.

E.  Create navigation links to the views in your application.

# Assignment 3:

Research and identify the data you would need to manage as part of your application. 
Determine tables and columns required for your application.
You may define the data structure in either Word or Excel or equivalent software. 

# Assignment 4:

#### Part 1: Create Database & Connect Application

a.) Create database for your application on the school server.

b.) Create the tables for your application.

c.) Insert at least 5 sample records in each table.

d.) Connect your application to connect to the database created in step a.

e.) Develop routes and views for each table to:

View 1.) Lists all records of each table in a tabular format. 

View 2.) Add new record to the table - receive data input and save.

View 3.) Show one record in a display (read-only) mode.

View 4.) Edit existing record - show existing data values and update.

f.) On the listing view (view #1):

f.1.) Enable links for each record to show (view #3) and edit (view #4).

f.2.) Enable Delete capability for each record.

g.) Create hyperlinks for each table in the header section to list view (view #1)


#### Part 2: Additional Application Views

a.) Add two additional static views to your website.

b.) The two views should be named as "privacy" and "help".

c.) Link the two newly created views in the footer section.

# Assignment 5: 

#### Part 1: Online Reports:

Create a new route called "reports" with views for following purposes:

a.) A view that provides links and description to the various reports available (reports menu).

b.) A view that lists all the customers (name, city, state, phone, email, etc.)

c.) A view that lists all the products or services available for sale (product/service name, price, category (if avail.), etc.)

d.) A view that lists all the sales (customer, product, sale date, sale price, etc.)

e.) Create the link for the reports listing view (view of step a) on the header section of your application.

#### Part 2: Search:

Create a new route and associated view to enable customers search for product or services available for sale:

a.) Create a view that would allow the end-user to enter the search criteria.

b.) Based on the search criteria, list any product or service records that matches the criteria. Use the LIKE operator and wildcard as described in the lecture.

c.) Provide search control on the application header to make search capability available throughout the application.

d.) OPTIONAL: In the search results, enable link to view product/service details by linking it to the "Details" view.

# Part 3: Advertisements:

Create a section on the home page to show advertisements or promotions of your products or services:

a.) Create a database table called "promotion".

b.) Load some sample data. Create some sample images and place them in "public\images" directory and store the filename in the corresponding column of each record. Make sure that the dates for each promotion are such that some promotions would be current, some would be active in future and some that have been expired.

c.) Modify the index route and index view (homepage) to show active "promotion". Active promotions are when today's date fall between the start date and end date.


# Assignment 6: 

#### Part 1: Shopping Cart

a.) Create a catalog of all products/services available for sale

b.) Enable customer to add desired product & quantity to shopping cart

c.) Provide a view that details the selected products & quantity in shopping cart

d.) Provide product name, price and line total (product price * quantity)

e.) Enable customer remove desired items from shopping cart

f.) Enable customer to Checkout that leads to saving desired products and quantities in sale record (SaleOrder and OrderDetails tables)

#### Part 2: Customer Registration - Password Encryption

a.) If required, modify Customer table to accommodate username and password columns

b.) Enable customer to self-register account in database.

c.) Save password in encrypted (hash) format in database.

d.) Enable login for customer to authenticate with valid username and password.

e.) Redirect user to login page if username and password are incorrect