import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { User, UserRelations, Role, Department, Blog } from '../models';
import { RoleRepository } from './role.repository';
import { DepartmentRepository } from './department.repository';
import { BlogRepository } from './blog.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly department: BelongsToAccessor<Department, typeof User.prototype.id>;

  public readonly blogs: HasManyRepositoryFactory<Blog, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>, @repository.getter('BlogRepository') protected blogRepositoryGetter: Getter<BlogRepository>,
  ) {
    super(User, dataSource);
    this.blogs = this.createHasManyRepositoryFactoryFor('blogs', blogRepositoryGetter,);
    this.registerInclusionResolver('blogs', this.blogs.inclusionResolver);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
