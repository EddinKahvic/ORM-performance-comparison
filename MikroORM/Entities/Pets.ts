import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Owners } from './Owners';
import { Types } from './Types';

@Entity()
export class Pets {

  @PrimaryKey()
  id!: number;

  @Property({ length: 30, nullable: true })
  name?: string;

  @Property({ columnType: 'date', nullable: true })
  birthDate?: string;

  @ManyToOne({ entity: () => Types, index: 'type_id' })
  type!: Types;

  @ManyToOne({ entity: () => Owners, nullable: true, index: 'owner_id' })
  owner?: Owners;

}
