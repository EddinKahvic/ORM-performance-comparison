import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Types {

  @PrimaryKey()
  id!: number;

  @Index({ name: 'name' })
  @Property({ length: 80, nullable: true })
  name?: string;

}
