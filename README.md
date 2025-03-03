

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Solution

* The SPA and backend were implemented using next js v15. 
* The endpoints in nextjs need to live in ```pages/api``` and all POST and GET endpoints are ```/api/assets```.
* I decided to save the uploaded file contents to a file named ```assets.json``` which will be created at the root of the project. 
* Also decided to append records to the file instead of overwriting them or creating files per company id.

## Scalability & Extension Notes

* To handle large file uploads I think I would start with a streaming approach, so instead of loading the entire file into memory, I'd use some streaming library to process the file in chunks. This woould reduce memory usage and latency.
* For multiple companies (100+) upload files simultaneously, I'd use a load balancer and multiple servers, or k8s with HPA to automatically scale the number of replicas based on CPU usage or custom metrics, or implement a message queue to buffer incoming requests and allow services to process them at a slower rate.
* Regarding geocoding data I cannot really say much as I have no experience with it whatsoever, but if I have to guess I would store partial data in a separate table/collection and only when I have all the data I would store in its intended destination.







This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

