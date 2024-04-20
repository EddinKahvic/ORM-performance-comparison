import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Specialties {

  @PrimaryKey()
  id!: number;

  @Property({ length: 80, nullable: true })
  name?: string;

}
