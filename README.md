# CMPE-202 Fall-2021 Team Project
# Airline Application (Team 4)
# Team Name: *AvengHerS*
# Team Members:
* Kesiya Raj (SJSU_ID: 015337387)
* Kiran Bala Devineni (SJSU_ID: 015218866)
* Nancy Saxena (SJSU_ID: 014554891)
* Vasudha Pasumarthi (SJSU_ID: 015328417)
# Scrum Meetings Schedule:
&ensp; Every, 
* Thursday
* Sunday
# XP Core Values Implemented:
* Communication
* Feedback
* Respect
# Summary of contributions (for each team member):
**Kesiya Raj (SJSU_ID: 015337387):**
* Payment using miles
* Reward miles management
* User account (where user can view past and current trips)
* Backend for cancel/update reservation

**Kiran Bala Devineni (SJSU_ID: 015218866):**
* Frontend, backend and database design for,
  * Enrolling as a new customer (Register/Sign-up)
  * Authenticating as a returning customer/admin (Login)
  * Search for flights
  * Select flights and book travel
  * Rerouting to seat selection & purchase page 
* UI Wireframes 
* Project Documentation

**Nancy Saxena (SJSU_ID: 014554891):**
* Frontend for Cancel/change reservation 
* Admin part- update, cancel & edit flights 
* Deployment

**Vasudha Pasumarthi (SJSU_ID: 015328417):**
* Ticket page 
* Payment using card
* Seat selection 
* Seat purchase
* home page
# Technology Stack:
&ensp; MERN Stack
* Frontend: ReactJS, BootStrap, MaterialUI 
* Backend: NodeJS, ExpressJS 
* Database: MongoDB 
* Authentication: PassportJS 
* Cloud: Amazon Web Services (EC2 Cluster) 
# Architecture Diagram:
![alt text](https://github.com/gopinathsjsu/team-project-avenghers/blob/Kesiya/ProjectDocuments/Architecture_Diagram.jpeg?raw=true)
# Design Decisions:
## Architecture-level:
* MERN stack.
* Separate deployment environments for frontend and backend applications.
## Application Design-level:
* Leveraging nodeJS and Express design patterns to design APIs. 
* These design patterns helped us add new APIs relatively easily.
## Business-level:
### Feature Set:
Below listed are the decisions/use cases considered for features provided by the Airline application:
#### User:
* Enrolling as a new customer (Register/Sign-up)
* Authenticating as a returning customer (Login)
* Manage Mileage rewards account
* Search for flights and book travel
* Purchase seats
* Change/Cancel reservations
#### Admin:
* Login
* Add flights
* Update flight info
* View all bookings
# Database Design (Tables):
https://github.com/gopinathsjsu/team-project-avenghers/tree/main/ProjectDocuments/DB_Tables
* users
* Airlines
* SeatSelection
* booktravel
# Steps to start the application:    
Follow the below steps to get the development environment running:

* Clone the repository from GitHub
```
git clone https://github.com/gopinathsjsu/team-project-avenghers.git
```
* Install node modules
```
cd team-project-avenghers
cd frontend 
npm install
cd .. 
cd backend
npm install
```
Starting both front-end and back-end:
* Frontend <br />
```
cd frontend
npm start
```
* Backend <br />
```
cd backend
npm run devStart
```
# UI Wireframes:
https://github.com/gopinathsjsu/team-project-avenghers/tree/main/UI%20Wireframes

# Team's Project Task Board: 
https://github.com/gopinathsjsu/team-project-avenghers/blob/main/ProjectDocuments/ProjectTaskBoard.xlsx

# Team's Project Journal:
https://github.com/gopinathsjsu/team-project-avenghers/blob/main/ProjectDocuments/ProjectJournal.pdf

# Team's Google Sprint Task Sheet:
Sprint Task sheet and Burndown charts included:<br />

https://docs.google.com/spreadsheets/d/1rziCTSVE-TOeh3UK-1INmpe5DEqMqLSNpSMqdoxzE1A/edit#gid=1013035299
       
