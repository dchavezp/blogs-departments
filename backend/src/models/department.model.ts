import { Entity, model, property, hasMany } from '@loopback/repository';
import { User } from './user.model';

@model()
export class Department extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
