import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pets, petsId } from './pets';

export interface ownersAttributes {
  id: number;
  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  telephone?: string;
}

export type ownersPk = "id";
export type ownersId = owners[ownersPk];
export type ownersOptionalAttributes = "id" | "first_name" | "last_name" | "address" | "city" | "telephone";
export type ownersCreationAttributes = Optional<ownersAttributes, ownersOptionalAttributes>;

export class owners extends Model<ownersAttributes, ownersCreationAttributes> implements ownersAttributes {
  id!: number;
  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  telephone?: string;

  // owners hasMany pets via owner_id
  pets!: pets[];
  getPets!: Sequelize.HasManyGetAssociationsMixin<pets>;
  setPets!: Sequelize.HasManySetAssociationsMixin<pets, petsId>;
  addPet!: Sequelize.HasManyAddAssociationMixin<pets, petsId>;
  addPets!: Sequelize.HasManyAddAssociationsMixin<pets, petsId>;
  createPet!: Sequelize.HasManyCreateAssociationMixin<pets>;
  removePet!: Sequelize.HasManyRemoveAssociationMixin<pets, petsId>;
  removePets!: Sequelize.HasManyRemoveAssociationsMixin<pets, petsId>;
  hasPet!: Sequelize.HasManyHasAssociationMixin<pets, petsId>;
  hasPets!: Sequelize.HasManyHasAssociationsMixin<pets, petsId>;
  countPets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof owners {
    return owners.init({
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
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'owners',
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
    ]
  });
  }
}
