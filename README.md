# Movies API Tech Test

This is a RESTful API that provides information about movies, users, and ratings. It is built using Node.js, Express, and MongoDB. The API is designed to be modular and scalable, with separate schemas for movies, users, and ratings.

## Tech Stack
<div align="left">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/> 
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/Mongoose-black?style=for-the-badge&logo=Mongoose&logoColor=white"/>
        <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
    </div>
    
    
## Database Design
Whilst this challenge could have been completed using only 2 schemas, with ratings being held in an array in the movies schema, I decided to implement a separate schema solely for ratings. This would make API calls only relying on ratings easier, and also offers more modularity if more complex API calls were to be implemented down the line.

![Screenshot_20230212_005834](https://user-images.githubusercontent.com/34510364/218287532-188e3c9e-8c5f-4450-99ed-48505c5620fa.png)

I opted to use a NoSQL database as opposed to SQL mostly for simplicity and flexibility, enabling the schemas to be changed with more ease if necessary. I chose MongoDB, Mongoose and Express as they are where I hold the most experience. Express in particular I find to be very structured and can make it easy to add to the codebase without much difficulty

## Approach

- **Schema Modeling**: I started with modelling my schemas and hosting my database on MongoDB Atlas allowing me to easily connect to the database and manage it from a web interface
- **Seeding**: I populated the database with sample data to test the API endpoints. This involved creating JavaScript files that contained JSON data and using Mongoose to insert it into the database
- **Route Setup**: I then created route files for each endpoint of the API, using Express to handle HTTP requests and responses. This helped me to plan the structure of the API and keep the code organised.
- **API Implementation**: One-by-one I wrote the business logic for each API endpoint, using Mongoose to interact with the database, and Postman to test each endpoint and make sure it returned the expected data.
- **Refactoring**: Once I was happy with the implementation, I went back over the code to make it more readable and scalable, breaking down larger methods into smaller ones and removing duplicated code. I also separated the business logic into separate service files to keep the controllers focused splely on handling HTTP requests and responses.
- **Testing** I used Jest to write unit tests for each endpoint of the API. This helped me to catch bugs and ensure the API was working as expected.


## Demo


https://user-images.githubusercontent.com/34510364/219252060-f16cff92-6698-4a52-ad7b-37a0279da5fc.mp4


## Future Improvements

- More rigorous testing with ideally integration tests. When running tests on individual files they pass with no errors, however sometimes upon running `npm test`, only certain tests would pass, I believe due to the database not dropping between tests, possibly because the database is cloud hosted. Whilst I implemented a test database so the original database would not be affected, I would like to resolve this issue. Additionally there may be issues that only show up when the entire API is running. Integration tests would help to catch these issues.
- Implementing middleware would allow for better error handling and response formatting.
- More fleshed out Schemas
- Additional responses
- Continue forward with a more Test-Driven-Development approach
