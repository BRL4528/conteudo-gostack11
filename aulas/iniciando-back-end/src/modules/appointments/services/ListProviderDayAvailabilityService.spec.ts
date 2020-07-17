import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the day availability from povider', async () => {
    await fakeAppointmentsRepository.create({
     provider_id: 'user',
     date: new Date(2020, 4, 20, 8, 0, 0),
   });

   await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2020, 4, 20, 10, 0, 0),
  });



  const availability = await listProvidersDayAvailability.execute({
    provider_id: 'user',
    year: 2020,
    month: 5,
    day: 20,
  })

  expect(availability).toEqual(expect.arrayContaining([

      { day: 8, available: false },
      { day: 9, available: true },
      { day: 10, available: false },
      { day: 11, available: true },

  ]))

  });

});
