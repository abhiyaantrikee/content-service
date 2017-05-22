# content-service (Content as a Service Application)

## Setup

### Docker
[Docker](https://www.docker.com/) is required to build and start mandrake. Click here for [setup instructions](https://docs.docker.com/engine/installation/)

#### Checkout code
```
git https://github.com/abhiyaantrikee/content-service.git
```
#### Build content-service
```
cd content-service
docker-compose build
```
#### Start servers
```
docker-compose up -d
```
- docker-ip: ```docker-machine ip```
- content-service: https://docker-ip:9000/explorer

[Win/Mac]: For the ports to be accessible on localhost, add port-forwarding in virtualbox.

**Content as a Service** is a new type of CMS, different than traditional CMS like WordPress which provides one stop solution for creating websites, managing and publishing its content.

Content as a Service (Caas) focuses purely on content management without worrying about the type of output (which can be anything like mobile apps, websites, other channels or devices). CaaS advises to use CMS only for managing content instead of handling its presentation.

### Characteristics of CaaS
* Content would be retrieved using simple REST API (Microservices based).
* Content would be retrieved in well defined structure such as JSON.
* Content Model could be extended with customized attributes according to the domain.
* Web interface would be available for Admin (Content Writers, Business Users) to manage Content easily.
* Webhooks would be available to act upon Content updates like to send notifications etc.
* Content could be hosted in the cloud.

### CaaS Vs Traditional CMS
* Structured response for Content
* Seperation of Content and Presentation (Decoupled)
* Content Availablity on Cloud

### Usages of Caas
* Content would be available as backend/APIs for Web / Mobile Apps.
* Content would be published for multi-channels in one go.
* Content would be integrated into Rich WebApps using latest MV* Frameworks
* Content Integration with existing applications/services
* Customized UX
* Content creation would be required programatically through APIs

### Limitations of CaaS
* Not apt for sites related to personal blogs.
* Huge effort and complex in case Content would be available only for one channel. There are cheaper and simple solutions are available.

# Installation
 To be updated
 
# Content as a Service - API Details 
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