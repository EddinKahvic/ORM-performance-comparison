import type { Sequelize } from "sequelize";
import { owners as _owners } from "./owners";
import type { ownersAttributes, ownersCreationAttributes } from "./owners";
import { pets as _pets } from "./pets";
import type { petsAttributes, petsCreationAttributes } from "./pets";
import { specialties as _specialties } from "./specialties";
import type { specialtiesAttributes, specialtiesCreationAttributes } from "./specialties";
import { types as _types } from "./types";
import type { typesAttributes, typesCreationAttributes } from "./types";
import { vet_specialties as _vet_specialties } from "./vet_specialties";
import type { vet_specialtiesAttributes, vet_specialtiesCreationAttributes } from "./vet_specialties";
import { vets as _vets } from "./vets";
import type { vetsAttributes, vetsCreationAttributes } from "./vets";
import { visits as _visits } from "./visits";
import type { visitsAttributes, visitsCreationAttributes } from "./visits";

export {
  _owners as owners,
  _pets as pets,
  _specialties as specialties,
  _types as types,
  _vet_specialties as vet_specialties,
  _vets as vets,
  _visits as visits,
};

export type {
  ownersAttributes,
  ownersCreationAttributes,
  petsAttributes,
  petsCreationAttributes,
  specialtiesAttributes,
  specialtiesCreationAttributes,
  typesAttributes,
  typesCreationAttributes,
  vet_specialtiesAttributes,
  vet_specialtiesCreationAttributes,
  vetsAttributes,
  vetsCreationAttributes,
  visitsAttributes,
  visitsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const owners = _owners.initModel(sequelize);
  const pets = _pets.initModel(sequelize);
  const specialties = _specialties.initModel(sequelize);
  const types = _types.initModel(sequelize);
  const vet_specialties = _vet_specialties.initModel(sequelize);
  const vets = _vets.initModel(sequelize);
  const visits = _visits.initModel(sequelize);

  pets.belongsTo(owners, { as: "owner", foreignKey: "owner_id"});
  owners.hasMany(pets, { as: "pets", foreignKey: "owner_id"});
  visits.belongsTo(pets, { as: "pet", foreignKey: "pet_id"});
  pets.hasMany(visits, { as: "visits", foreignKey: "pet_id"});
  vet_specialties.belongsTo(specialties, { as: "specialty", foreignKey: "specialty_id"});
  specialties.hasMany(vet_specialties, { as: "vet_specialties", foreignKey: "specialty_id"});
  pets.belongsTo(types, { as: "type", foreignKey: "type_id"});
  types.hasMany(pets, { as: "pets", foreignKey: "type_id"});
  vet_specialties.belongsTo(vets, { as: "vet", foreignKey: "vet_id"});
  vets.hasMany(vet_specialties, { as: "vet_specialties", foreignKey: "vet_id"});

  return {
    owners: owners,
    pets: pets,
    specialties: specialties,
    types: types,
    vet_specialties: vet_specialties,
    vets: vets,
    visits: visits,
  };
}
