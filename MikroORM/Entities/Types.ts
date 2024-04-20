import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Types {

  @PrimaryKey()
  id!: number;

  @Property({ length: 80, nullable: true })
  name?: string;

}
