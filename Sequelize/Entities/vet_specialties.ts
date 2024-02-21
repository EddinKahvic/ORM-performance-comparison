import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { specialties, specialtiesId } from './specialties';
import type { vets, vetsId } from './vets';

export interface vet_specialtiesAttributes {
  vet_id: number;
  specialty_id: number;
}

export type vet_specialtiesPk = "vet_id" | "specialty_id";
export type vet_specialtiesId = vet_specialties[vet_specialtiesPk];
export type vet_specialtiesCreationAttributes = vet_specialtiesAttributes;

export class vet_specialties extends Model<vet_specialtiesAttributes, vet_specialtiesCreationAttributes> implements vet_specialtiesAttributes {
  vet_id!: number;
  specialty_id!: number;

  // vet_specialties belongsTo specialties via specialty_id
  specialty!: specialties;
  getSpecialty!: Sequelize.BelongsToGetAssociationMixin<specialties>;
  setSpecialty!: Sequelize.BelongsToSetAssociationMixin<specialties, specialtiesId>;
  createSpecialty!: Sequelize.BelongsToCreateAssociationMixin<specialties>;
  // vet_specialties belongsTo vets via vet_id
  vet!: vets;
  getVet!: Sequelize.BelongsToGetAssociationMixin<vets>;
  setVet!: Sequelize.BelongsToSetAssociationMixin<vets, vetsId>;
  createVet!: Sequelize.BelongsToCreateAssociationMixin<vets>;

  static initModel(sequelize: Sequelize.Sequelize): typeof vet_specialties {
    return vet_specialties.init({
    vet_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'vets',
        key: 'id'
      }
    },
    specialty_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'specialties',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'vet_specialties',
    timestamps: false,
    indexes: [
      {
        name: "vet_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vet_id" },
          { name: "specialty_id" },
        ]
      },
      {
        name: "specialty_id",
        using: "BTREE",
        fields: [
          { name: "specialty_id" },
        ]
      },
    ]
  });
  }
}
