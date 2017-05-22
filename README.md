# content-service (Content as a Service Application)

**Content as a Service (CaaS)** is a new type of CMS which is different than traditional CMS. Traditional CMS provides one stop shop solution for creating websites, managing and publishing its content.

Content as a Service (Caas) emphases essentially on content management without thinking about the type of output (which could be for any channel like mobile apps, websites, other devices). CaaS counsels to use CMS only for managing content instead of handling its output/presentation.

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

### Limitations of CaaS
* Blogging sites where content is personal.
* Huge effort and complex in case Content would be available only for one channel. There are cheaper and simple solutions are available than having CaaS.

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

Want to contribute to *content-service*? Please read CONTRIBUTING.md.