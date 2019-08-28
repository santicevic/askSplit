## **AskSplit**

#### Practice app for Extension Engine 2019 summer camp task
#### Application insipired by stack overflow to help lost tourists find their way in Croatia.

### Deployed app
### >>>https://asksplit.herokuapp.com/<<<

#### Functionalities:
- Registration/login with JWT tokens
- Leaving posts, replies to posts and comments on replies
- Post tags and filtering by tags
- Post and reply up&down vote
- Post and reply score tracking
- Real time pop up notifications
- Profile picture upload and change
- Somewhat responsive
- User profiles
- Post and profile share to twitter, facebook and whatsapp

#### Project setup:
1. Setup development database environment in *config/config.json*
2. Open the terminal in project root directory and run the following commands:
  ```
  user$ npm install
  user$ sequelize db:migrate
  user$ sequelize db:seed:all
  user$ npm run client-install
  user$ npm run dev
  ```
