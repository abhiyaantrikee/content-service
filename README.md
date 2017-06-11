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
![](https://github.com/abhiyaantrikee/content-service/blob/master/docs/component.png)
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

Before getting the `Access Token` we need to create the following using the APIs
* User
* Role
* RoleMapping

There are various APIs which are available and would be leveraged to perform the above mentioned actions.
|HTTP METHOD | URI | DESCRIPTION| SAMPLE REQUEST | SAMPLE RESPONSE
|:---:|:---:|:---|:---|:---|
| **POST**| /api/Users|This would create a USER in Database|``` {"username": "bob","email": "bob@test.com","password":"123"}```|```{"username": "bob","email": "bob@test.com","id": "593d993f5387fd000f6e066b"}```|
| **POST**| /api/Roles|This would create a ROLE in Database|```{"name": "write"}```|``` {"id": "593d99825387fd000f6e066d","name": "write","created":"2017-06-11T19:26:58.337Z","modified": "2017-06-11T19:26:58.337Z"}```|
| **POST**| /api/RoleMappings|This would create a MAPPING between USER and ROLE in Database|```{"principalType": "USER","principalId":"593d993f5387fd000f6e066b","roleId": "593d99825387fd000f6e066d"}```|``` {"id": "593d99b95387fd000f6e066e","principalType": "USER","principalId": "593d993f5387fd000f6e066b","roleId": "593d99825387fd000f6e066d"}```|

Once the USER, ROLE and ROLE MAPPING is created, ACCESS TOKEN would be generated as below:

*Steps to get access token:*

**1.** Use POST - https://docker-ip:9000/api/Users/login to get the access token.
**Payload example:** 
```
{"email": "bob@doe.com", "password": "123"}
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
MongoDB is used as a database. Currently, it is part of same docker as of application. This would change in future release and would be independent of application (to be inline with the architecture).
*** 
Want to contribute to *content-service*? Please read [CONTRIBUTING](https://github.com/abhiyaantrikee/content-service/blob/master/CONTRIBUTING.md).
