import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsUniqueConstraintInput } from './is-unique';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqueConstraintInput = args.constraints[0];
    let query = this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value });
    // If an ID is provided, exclude the record with that ID from the query
    if (args.object['id']) {
      query = query.andWhere(`${tableName}.id != :id`, {
        id: args.object['id'],
      });
    }
    const count = await query.getCount();
    return count === 0; // Returns true if the count is 0 (unique), otherwise false
  }

  defaultMessage?(args?: ValidationArguments): string {
    const { title }: IsUniqueConstraintInput = args.constraints[0];
    return `${'the ' + title + ' already exist'}`;
  }
}
