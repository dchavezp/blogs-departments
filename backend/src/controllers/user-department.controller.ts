import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Department,
} from '../models';
import {UserRepository} from '../repositories';

export class UserDepartmentController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Department> {
    return this.userRepository.department(id);
  }
}
