import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject,
  HttpErrors,
} from '@loopback/rest';
import { User } from '../models';
import { DepartmentRepository, RoleRepository, UserRepository } from '../repositories';
import {
  TokenServiceBindings,
  MyUserService,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { TokenService } from '@loopback/authentication';
import { SecurityBindings } from '@loopback/security';
import { inject } from '@loopback/core';
import { compareHashed, encrypt } from '../services/encrypt.service';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};
export interface UserProfile {
  username: string,
  role: string,
  department: string
}
export interface Credentials {
  username: string,
  password: string
}
export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository)
    protected userRepository: UserRepository,
    @repository(RoleRepository)
    protected roleRepository: RoleRepository,
    @repository(DepartmentRepository)
    protected departmentRepository: DepartmentRepository
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ isLogged: boolean, userProfile: UserProfile | null }> {
    const userLogged = await this.userRepository.findOne({ where: { username: credentials.username } });
    const passwordStored = userLogged?.password ?? ""
    const isLogged = await compareHashed(credentials.password, passwordStored)
    if (isLogged) {
      const roleInfo = await this.roleRepository.findById(userLogged?.roleId)
      const department = await this.departmentRepository.findById(userLogged?.departmentId)
      const userProfile: UserProfile = {
        username: userLogged?.username ?? "",
        role: roleInfo?.name ?? "",
        department: department?.name ?? ""
      }
      return { isLogged, userProfile: userProfile }
    }
    return { isLogged, userProfile: null };
  }
  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    const isValidRole = await this.roleRepository.findById(user.roleId);
    const isValidDepartment = await this.departmentRepository.findById(user.departmentId);
    if (isValidRole && isValidDepartment) {
      const passHashed = await encrypt(user.password);
      const newUser = { ...user, password: passHashed }
      return this.userRepository.create(newUser);
    }
    throw new HttpErrors[404]("Id not found on Entity Role or Department")
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
  ): Promise<void> {
    const passHashed = await encrypt(user.password);
    const newUser = { ...user, password: passHashed }
    await this.userRepository.updateById(id, newUser);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    const passHashed = await encrypt(user.password);
    const newUser = { ...user, password: passHashed }
    await this.userRepository.replaceById(id, newUser);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
