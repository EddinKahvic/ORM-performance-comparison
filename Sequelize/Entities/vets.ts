import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { vet_specialties, vet_specialtiesId } from './vet_specialties';

export interface vetsAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
}

export type vetsPk = "id";
export type vetsId = vets[vetsPk];
export type vetsOptionalAttributes = "id" | "first_name" | "last_name";
export type vetsCreationAttributes = Optional<vetsAttributes, vetsOptionalAttributes>;

export class vets extends Model<vetsAttributes, vetsCreationAttributes> implements vetsAttributes {
  id!: number;
  first_name?: string;
  last_name?: string;

  // vets hasMany vet_specialties via vet_id
  vet_specialties!: vet_specialties[];
  getVet_specialties!: Sequelize.HasManyGetAssociationsMixin<vet_specialties>;
  setVet_specialties!: Sequelize.HasManySetAssociationsMixin<vet_specialties, vet_specialtiesId>;
  addVet_specialty!: Sequelize.HasManyAddAssociationMixin<vet_specialties, vet_specialtiesId>;
  addVet_specialties!: Sequelize.HasManyAddAssociationsMixin<vet_specialties, vet_specialtiesId>;
  createVet_specialty!: Sequelize.HasManyCreateAssociationMixin<vet_specialties>;
  removeVet_specialty!: Sequelize.HasManyRemoveAssociationMixin<vet_specialties, vet_specialtiesId>;
  removeVet_specialties!: Sequelize.HasManyRemoveAssociationsMixin<vet_specialties, vet_specialtiesId>;
  hasVet_specialty!: Sequelize.HasManyHasAssociationMixin<vet_specialties, vet_specialtiesId>;
  hasVet_specialties!: Sequelize.HasManyHasAssociationsMixin<vet_specialties, vet_specialtiesId>;
  countVet_specialties!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof vets {
    return vets.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "last_name",
        using: "BTREE",
        fields: [
          { name: "last_name" },
        ]
      },
    ]
  });
  }
}
