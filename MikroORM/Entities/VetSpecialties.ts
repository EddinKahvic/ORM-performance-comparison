import { Entity, ManyToOne, OneToOne, PrimaryKeyProp } from '@mikro-orm/core';
import { Specialties } from './Specialties';
import { Vets } from './Vets';

@Entity()
export class VetSpecialties {

  [PrimaryKeyProp]?: ['vet', 'specialty'];

  @OneToOne({ entity: () => Vets, primary: true, unique: 'vet_id' })
  vet!: Vets;

  @ManyToOne({ entity: () => Specialties, primary: true, index: 'specialty_id' })
  specialty!: Specialties;

}
