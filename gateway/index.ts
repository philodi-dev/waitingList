import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import Producer from './middleware/producer'
import Agent from './services/agent';
import Client from './services/client';
import Wait from './services/wait';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const producer = new Producer();

app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  const customer = new Wait()
  const allCustomers = await customer.getWaitingList(["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"]);
  res.json(allCustomers);
});

app.get('/users', async (req: Request, res: Response) => {
  const user = new Agent()
  const allUsers = await user?.getAllUsers();
  res.json(allUsers);
});


/* 
  1. Only authorized people to access the route
  2. Check wheter there any request body being sent
  3. Data validation and manipulation
  4. Save the customer details on the database and get a ticket number
  5. Store the ticket number in a message queu as pending for completion
  * 6. Trigger the notification service to send sms to customer regarding their payment time

  Note: The sms-c service will consume the message queeu being producing here and be able to send the sms to the employee
  with their ticket number information, time to be paied and some additional informations
*/
app.post('/enroll', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {firstName, lastName, middleName, gender, avatar, email, phoneNumber, company , userStatus, userId} = req.body;
    const customer = new Client(firstName, lastName, middleName, gender, avatar, email, phoneNumber, company, userStatus);
    const newCustomer = await customer.createCustomer();

    await producer.publishMessage("PENDING", `Customer enrolled successfully at ${new Date()}`, newCustomer, userId)

    res.json({
      status: 201,
      data: newCustomer,
      message: `Customer enrolled successfully at ${new Date()}`
    });

  } catch (error: any) {
    res.json({
      status: 501,
      data: [],
      message: `${error.message}`
    });
  }
});

app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {firstName, lastName, gender, avatar, email, phoneNumber, pin, role, userStatus} = req.body;
    const agent = new Agent(firstName, lastName, gender, avatar, email, phoneNumber, pin, role, userStatus);
    const newAgent = await agent.createUser();

    res.json({
      status: 201,
      data: newAgent,
      message: `Agent created successfully at ${new Date()}`
    });

  } catch (error: any) {
    res.json({
      status: 501,
      data: [],
      message: `${error.message}`
    });
  }
});

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {username, pin} = req.body;
    const agent = new Agent();
    const newAgent = await agent.userLogin(username, pin);

    res.json({
      status: 201,
      data: newAgent,
      message: `Agent created successfully at ${new Date()}`
    });

  } catch (error: any) {
    res.json({
      status: 501,
      data: [],
      message: `${error.message}`
    });
  }
});


/* 
  1. Only authorized people to access the route
  2. Get the next available ticket number to process
  3. Data validation and manipulation
  4. Update the ticket number as completed
  5. Store the ticket number in a message queu as pending for completion
  * 6. Trigger the notification service to send sms to employee regarding their payment time

  Note: The sms-c service will consume the message queeu being producing here and be able to send the sms to the employee
  with their ticket number information, time to be paied and some additional informations
*/
app.post('/complete', async (req: Request, res: Response, next: NextFunction) => {
  const {routingKey, message} = req.body;
  // await producer.publishMessage(routingKey, message)
  res.send(`successfully completed the subscription at ${new Date()}`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});