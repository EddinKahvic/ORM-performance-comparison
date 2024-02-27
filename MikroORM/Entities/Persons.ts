import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Persons {

  @PrimaryKey()
  id!: number;

  @Property({ fieldName: 'parentId', nullable: true })
  parentId?: number;

  @Property({ fieldName: 'firstName', length: 255, nullable: true })
  firstName?: string;

}
