import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Pets } from './Pets';

@Entity()
export class Visits {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Pets, nullable: true, index: 'pet_id' })
  pet?: Pets;

  @Property({ columnType: 'date', nullable: true })
  visitDate?: string;

  @Property({ length: 255, nullable: true })
  description?: string;

}
