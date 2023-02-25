import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Department,
  User,
} from '../models';
import { DepartmentRepository } from '../repositories';
import { encrypt } from '../services/encrypt.service';

export class DepartmentUserController {
  constructor(
    @repository(DepartmentRepository) protected departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Department has many User',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(User) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.departmentRepository.users(id).find(filter);
  }

  @post('/departments/{id}/users', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: { 'application/json': { schema: getModelSchemaRef(User) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Department.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInDepartment',
            exclude: ['id'],
            optional: ['departmentId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    const passHashed = await encrypt(user.password);
    const newUser = { ...user, password: passHashed }
    return this.departmentRepository.users(id).create(newUser);
  }

  @patch('/departments/{id}/users', {
    responses: {
      '200': {
        description: 'Department.User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.departmentRepository.users(id).patch(user, where);
  }

  @del('/departments/{id}/users', {
    responses: {
      '200': {
        description: 'Department.User DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.departmentRepository.users(id).delete(where);
  }
}
