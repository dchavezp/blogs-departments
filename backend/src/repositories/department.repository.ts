import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Department, DepartmentRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Department, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
