# content-service (Content as a Service Application)

**Content as a Service (CaaS)** is a new type of CMS which is different than traditional CMS. Traditional CMS provides one stop shop solution for creating websites, managing and publishing its content.

Content as a Service (Caas) emphases essentially on content management without thinking about the type of end-users(which could be for any channel like mobile apps, websites, other devices). CaaS counsels to use CMS only for managing content instead of handling its output/presentation.

### Characteristics of CaaS
* Content would be retrieved only using simple REST API (Microservices based).
* Content would be retrieved in well defined structure (JSON).
* Web interface would be available for Admin (Content Writers, Business Users) to manage Content easily.
* Hooks would be available to act upon Content updates like to send notifications etc.
* Content could be hosted in the cloud.

### CaaS Vs Traditional CMS
* Structured response for Content
* Seperation of Content and Presentation (Decoupled)
* Content availablity on Cloud

### Usages of Caas
* Content would be available as backend/APIs for Web / Mobile Apps or other channels.
* Content could be published for multi-channels easily.
* Content would be integrated into Rich WebApps using latest MV* Frameworks
* Content Integration with existing applications/services
* Content to be presented on highly customized UX
* Content creation would be done programatically through APIs provided as Microservices.

## Project Badges

* Build status: [![Build Status](https://travis-ci.org/abhiyaantrikee/content-service.svg)](https://travis-ci.org/abhiyaantrikee/content-service)
* License: [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/abhiyaantrikee/content-service/master/LICENSE)

# High Level Component Architecture (Generic)
(https://github.com/abhiyaantrikee/content-service/blob/master/docs/component.png)
# Installation
### Docker
[Docker](https://www.docker.com/) is a *pre-requisite* to build and start **content-service** application. Click here for [docker setup instructions](https://docs.docker.com/engine/installation/)

#### Clone code
```
git clone https://github.com/abhiyaantrikee/content-service.git
```
#### Build 
```
cd content-service
docker-compose build
```
#### Start servers
```
docker-compose up -d
```
- docker-ip: ```docker-machine ip```
- content-service (Strongloop explorer): https://docker-ip:9000/explorer

**[Win/Mac]**: For the ports to be accessible on localhost, add port-forwarding in virtualbox.

# Content as a Service (CaaS) - API Details 
| Content Management API (Admin)| Path| Description|
| :---------------------------: |:---:|:---|
|**GET** | */contents*|Retrieve All Content [filters-Optional parameter based on this content will be fetched]
|**POST** | */contents*|Create Content|
|**PATCH** |*/contents* |Partially Update a Content (Workflow update)|
|**PUT** |*/contents* |Update a Content|

|Content Data API (Users) | Path| Description|
| :-----------------------: |:---:|:---|
| **GET**                   | */contents* | Retrieve Content ( using Filters and status=PUBLISHED and endDate > Current Date) |

### Usage
content-service API`s are protected with ACL, in order to use the API we need to pass authorization(access) token in the request header.
There are two Users having different role and access:
```
john@doe.com : is an enduser having consumer role and have access to below URL
```
|HTTP METHOD | URL|
| :-----------------------: |:---:|
| **GET**                   |  https://docker-ip:9000/api/Contents/ | 

```
bob@doe.com : is an adming having admin role and have access to below URLs
```

|HTTP METHOD | URL|
| :-----------------------: | :---: |
| **GET/POST/PUT/PATCH**|  https://docker-ip:9000/api/Contents/ |


*Steps to get access token:*

**1.** Use POST - https://docker-ip:9000/api/Users/login to get the access token.
**Payload example:** 
```
{"email": "john@doe.com", "password": "password"}
```

**Response**
```
{
  "id": "xEcPhyKQMk3IgmQFdL670a11OXQKSxCeLjUDLS9Pk24HuIO7oaZApO8zAPumd0LU",
  "ttl": 1209600,
  "created": "2017-05-23T04:32:26.105Z",
  "userId": 1
}
```

**2.** Set the access token with the value present under *id* tag (in above response).
**3.** Use POST - https://docker-ip:9000/api/Contents/
**Payload example:**
```
{
  "id": 0,
  "title": "Content Title",
  "name": "Content Name",
  "startDate": "2017-05-22T11:06:30.754Z",
  "endDate": "2019-05-22T11:06:30.754Z",
  "feature": "Content's Feature",
  "format": "TEXT",
  "version": "1.0",
  "majorVersionFlag": true,
  "assetUrl": "Content Asset URL",
  "text": "Content TEXT",
  "status": "CREATED",
  "createdBy": "USER CREATED THE CONTENT",
  "createdDate": "2017-05-22T11:06:30.756Z",
  "updatedDate": "2017-05-22T11:06:30.756Z",
  "updatedBy": "USER UPDATED THE CONTENT",
  "locale": "CONTENT's LOCATE",
  "extendedData": {},
  "workflowList": [
    {
      "userName": "USER UPDATED THE WORKFLOW",
      "role": "USER's ROLE",
      "comment": "COMMENTS, if any provided by the CONTENT Owner",
      "date": "2017-05-22T11:06:30.758Z",
      "id": 0
    }
  ]
}
```
**4.** Use GET - https://docker-ip:9000/api/Contents/

##### Note
Currently, content-service is based on "in-memory" database. Databases (like MongoDB) integration would be provided in future releases.
*** 
Want to contribute to *content-service*? Please read [CONTRIBUTING](https://github.com/abhiyaantrikee/content-service/blob/master/CONTRIBUTING.md).
