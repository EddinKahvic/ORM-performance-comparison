import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Owners {

  @PrimaryKey()
  id!: number;

  @Property({ length: 30, nullable: true })
  firstName?: string;

  @Index({ name: 'last_name' })
  @Property({ length: 30, nullable: true })
  lastName?: string;

  @Property({ length: 255, nullable: true })
  address?: string;

  @Property({ length: 80, nullable: true })
  city?: string;

  @Property({ length: 20, nullable: true })
  telephone?: string;

}
