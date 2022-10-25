# Richard-And-The-Richettes-Helping-Hand-UI

## Description:
An app created to help clients find people to complete odd jobs for them without the hassle of going through a hiring agency.
Clients will be able to post a request (including a description, job title, and deadline) and Helpers will be able to place bids on the job. 
The client will choose from the available bids and the request will be marked as pending. The request will be marked as closed once the job has been completed.

## Executive Summary:
A user will be able to sign up as a Client or a Helping Hand. Clients will be able to submit requests for tasks, with deadlines, they need help accomplishing. Helping Hands will be able to place bids on requests, setting a price they deem
  
### User Stories:
1. Client: 
* Log in/register
  * Submits a request, specifying the type (car wash, house work, etc) -mvp
  * Submits payment for job 
  * Submit reviews for the Helping Hand(Star rating?) - mvp
  * View own rating - mvp
    1. High rating and high request amount = preferred client status
    2. Some star on profile
  * View past and active requests - mvp
  * Can view/accept/deny bids on requests - mvp
2. Helping Hand: 
  * Log in/register
  * Places bids on jobs - mvp
  * Can decline jobs after accepting 
  * Cannot cancel within 24 hours
  * Can view own rating - mvp
  * High amount of jobs completed and high rating = preferred operative
    1. Some symbol, different than the client
  * Submit review of client
  * View past and upcoming jobs - mvp

### Stretch Goals:
1. Client:
  * Edit address, contact info and password - stretch
  * Calendar function - stretch
2. Helping Hand:
  * Edit address, contact info and password - stretch



### Classes: Client and Helping Hand

### Tables:
1. Client
  * Client ID
  * Username
  * Password
  * Full Address
  * Contact Info
  * Rating (5 star default)
2. Helper
  * helper_id
  * Username
  * Password
  * Full Address
  * Contact Info
  * Rating (5 star default)
3. Request
  * Job ID
  * Title
  * Client user
  * Client Address
  * Description
  * Deadline
  * Client Rating
  * Mission accomplished(boolean - default false)
4. Bids
  * Bid ID
  * Links with Request via Job ID
  * Links with Helping Hand via User
  * Bid - amount
5. Request Bid
