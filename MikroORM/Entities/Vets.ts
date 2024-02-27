import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Vets {

  @PrimaryKey()
  id!: number;

  @Property({ length: 30, nullable: true })
  firstName?: string;

  @Index({ name: 'last_name' })
  @Property({ length: 30, nullable: true })
  lastName?: string;

}
