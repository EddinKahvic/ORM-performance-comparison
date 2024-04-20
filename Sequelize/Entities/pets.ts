import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { owners, ownersId } from './owners';
import type { types, typesId } from './types';
import type { visits, visitsId } from './visits';

export interface petsAttributes {
  id: number;
  name?: string;
  birth_date?: string;
  type_id: number;
  owner_id?: number;
}

export type petsPk = "id";
export type petsId = pets[petsPk];
export type petsOptionalAttributes = "id" | "name" | "birth_date" | "owner_id";
export type petsCreationAttributes = Optional<petsAttributes, petsOptionalAttributes>;

export class pets extends Model<petsAttributes, petsCreationAttributes> implements petsAttributes {
  id!: number;
  name?: string;
  birth_date?: string;
  type_id!: number;
  owner_id?: number;

  // pets belongsTo owners via owner_id
  owner!: owners;
  getOwner!: Sequelize.BelongsToGetAssociationMixin<owners>;
  setOwner!: Sequelize.BelongsToSetAssociationMixin<owners, ownersId>;
  createOwner!: Sequelize.BelongsToCreateAssociationMixin<owners>;
  // pets hasMany visits via pet_id
  visits!: visits[];
  getVisits!: Sequelize.HasManyGetAssociationsMixin<visits>;
  setVisits!: Sequelize.HasManySetAssociationsMixin<visits, visitsId>;
  addVisit!: Sequelize.HasManyAddAssociationMixin<visits, visitsId>;
  addVisits!: Sequelize.HasManyAddAssociationsMixin<visits, visitsId>;
  createVisit!: Sequelize.HasManyCreateAssociationMixin<visits>;
  removeVisit!: Sequelize.HasManyRemoveAssociationMixin<visits, visitsId>;
  removeVisits!: Sequelize.HasManyRemoveAssociationsMixin<visits, visitsId>;
  hasVisit!: Sequelize.HasManyHasAssociationMixin<visits, visitsId>;
  hasVisits!: Sequelize.HasManyHasAssociationsMixin<visits, visitsId>;
  countVisits!: Sequelize.HasManyCountAssociationsMixin;
  // pets belongsTo types via type_id
  type!: types;
  getType!: Sequelize.BelongsToGetAssociationMixin<types>;
  setType!: Sequelize.BelongsToSetAssociationMixin<types, typesId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<types>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pets {
    return pets.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'types',
        key: 'id'
      }
    },
    owner_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'owners',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pets',
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
        name: "owner_id",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
  }
}
