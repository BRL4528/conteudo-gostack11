import Router from 'express';
import { parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


usersRouter.post('/', (request, response) => {
  try {



  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter;
