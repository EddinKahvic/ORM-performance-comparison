import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { vet_specialties, vet_specialtiesId } from './vet_specialties';

export interface specialtiesAttributes {
  id: number;
  name?: string;
}

export type specialtiesPk = "id";
export type specialtiesId = specialties[specialtiesPk];
export type specialtiesOptionalAttributes = "id" | "name";
export type specialtiesCreationAttributes = Optional<specialtiesAttributes, specialtiesOptionalAttributes>;

export class specialties extends Model<specialtiesAttributes, specialtiesCreationAttributes> implements specialtiesAttributes {
  id!: number;
  name?: string;

  // specialties hasMany vet_specialties via specialty_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof specialties {
    return specialties.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'specialties',
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
        name: "name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
