import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pets, petsId } from './pets';

export interface visitsAttributes {
  id: number;
  pet_id?: number;
  visit_date?: string;
  description?: string;
}

export type visitsPk = "id";
export type visitsId = visits[visitsPk];
export type visitsOptionalAttributes = "id" | "pet_id" | "visit_date" | "description";
export type visitsCreationAttributes = Optional<visitsAttributes, visitsOptionalAttributes>;

export class visits extends Model<visitsAttributes, visitsCreationAttributes> implements visitsAttributes {
  id!: number;
  pet_id?: number;
  visit_date?: string;
  description?: string;

  // visits belongsTo pets via pet_id
  pet!: pets;
  getPet!: Sequelize.BelongsToGetAssociationMixin<pets>;
  setPet!: Sequelize.BelongsToSetAssociationMixin<pets, petsId>;
  createPet!: Sequelize.BelongsToCreateAssociationMixin<pets>;

  static initModel(sequelize: Sequelize.Sequelize): typeof visits {
    return visits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    pet_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'pets',
        key: 'id'
      }
    },
    visit_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'visits',
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
        name: "pet_id",
        using: "BTREE",
        fields: [
          { name: "pet_id" },
        ]
      },
    ]
  });
  }
}
