import { DataTypes, Model } from "sequelize";
import db from "./dbConnection";
import { TypeProyectsFull } from "../domains/proyect_entity";

interface ProyectsCreationAttributes extends TypeProyectsFull {}

export class Proyect
  extends Model<TypeProyectsFull, ProyectsCreationAttributes>
  implements TypeProyectsFull
{
  public id!: string;
  public title!: string;
  public description!: string;
  public tecnologies!: string;
  public caracteristicas!: string;
  public image!: string;
  public imagenesProyect!: string;
  public link!: string;
  public link_gitHub!: string;
  public createdAt!: string;
  public status!: string;
  public typeProyect!: string;
  public counter_likes!: number;
}

Proyect.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeProyect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tecnologies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caracteristicas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagenesProyect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_gitHub: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    counter_likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    modelName: "proyects",
    tableName: "proyects",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);