import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Blog,
  User,
} from '../models';
import {BlogRepository} from '../repositories';

export class BlogUserController {
  constructor(
    @repository(BlogRepository)
    public blogRepository: BlogRepository,
  ) { }

  @get('/blogs/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Blog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Blog.prototype.id,
  ): Promise<User> {
    return this.blogRepository.user(id);
  }
}
