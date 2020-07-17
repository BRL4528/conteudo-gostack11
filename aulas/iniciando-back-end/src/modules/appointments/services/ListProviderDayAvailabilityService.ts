import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';

import IApointmentsRepository from '../repositories/IAppointmentsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IApointmentsRepository
  ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    });

    const hourstart = 8;

    const eachHourArray = Array.from(
      { lenght: 10 },
      (_, index) => index + hourstart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      )

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

   return availability;
  }
}

export default ListProviderDayAvailabilityService;
