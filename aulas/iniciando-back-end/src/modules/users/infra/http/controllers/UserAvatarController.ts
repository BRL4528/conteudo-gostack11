import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatart = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatart.execute({
      user_id: request.user.id,
      avatartFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
