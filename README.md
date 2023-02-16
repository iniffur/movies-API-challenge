# Movies API Tech Test

This is a small project devloping a RESTful Movie's API, designed to return user, movie, and rating information.

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

- I started with modelling my schemas and hosting my database on MongoDB Atlas
- After the database was connected, I seeded it with a reasonable amount of data to call the APIs
- Following this, I set up routes files to further help plan the structure of the codebase
- One-by-one, I implemented the API logic and coded in the varied responses - testing with Postman to see if I was getting the required results. In this stage, I decided to separate out the business logic into individual service files, as to keep the controller files to their purpose only
- I then went about refactoring, breaking down larger methods and making the code more readable and scalable
- Once satisfied with this stage, I began to write unit tests in Jest 

## Demo


https://user-images.githubusercontent.com/34510364/219252060-f16cff92-6698-4a52-ad7b-37a0279da5fc.mp4


## Future Improvements

- More rigorous testing with ideally integration tests. When running tests on individual files they pass with no errors, however sometimes upon running `npm test`, only certain tests would pass, I believe due to the database not dropping between tests, possibly because the database is cloud hosted. Whilst I implemented a test database so the original database would not be affected, I would like to resolve this issue
- Implement middleware - would help to handle particular errors and deliver responses
- More fleshed out Schemas
- Additional responses
- Continue forward with a more Test-Driven-Development approach
