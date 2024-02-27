import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pets, petsId } from './pets';

export interface typesAttributes {
  id: number;
  name?: string;
}

export type typesPk = "id";
export type typesId = types[typesPk];
export type typesOptionalAttributes = "id" | "name";
export type typesCreationAttributes = Optional<typesAttributes, typesOptionalAttributes>;

export class types extends Model<typesAttributes, typesCreationAttributes> implements typesAttributes {
  id!: number;
  name?: string;

  // types hasMany pets via type_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof types {
    return types.init({
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
    tableName: 'types',
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
