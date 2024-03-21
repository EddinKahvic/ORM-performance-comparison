import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Vets {

  @PrimaryKey()
  id!: number;

  @Property({ length: 30, nullable: true })
  firstName?: string;

  @Property({ length: 30, nullable: true })
  lastName?: string;

}
