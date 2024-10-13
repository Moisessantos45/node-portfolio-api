import {
  TypeProyectsFull,
  TypeProyectsUpdate,
} from "../domains/proyect_entity";
import IProyectRepository from "../domains/proyect_interface";
import { RepositorioBase } from "../shared/repositorio_base";
import { Proyect } from "../shared/model";
import db from "../shared/dbConnection";

class ProyectRepository
  extends RepositorioBase<Proyect>
  implements IProyectRepository
{
  constructor() {
    super(Proyect, "id");
  }

  async getProyects(): Promise<any[]> {
    const consultViewQuery = `
    SELECT * FROM v_Proyects;
  `;
    const [results] = await db.query(consultViewQuery);
    return results;
  }

  async getProyect(id: string): Promise<any> {
    const consultViewQuery = `
      SELECT * FROM v_Proyects WHERE id = :id;
    `;
    const [results] = await db.query(consultViewQuery, {
      replacements: { id },
    });
    return results[0];
  }

  // async createProyect(proyect: Partial<Proyect>): Promise<boolean> {
  //   return this.create(proyect).then(() => true);
  // }

  async createProyect(proyect: TypeProyectsFull): Promise<boolean> {
    return this.create(proyect).then(() => true);
  }

  async updateProyect(
    id: string,
    proyect: TypeProyectsUpdate
  ): Promise<boolean> {
    const response = await this.update(id, proyect);
    return response > 0;
  }

  async updateStateProyect(id: string, state: string): Promise<boolean> {
    const response = await this.updateStatus(id, state);
    return response > 0;
  }

  async updateLikesCount(id: string, count: number): Promise<boolean> {
    const response = await this.updateAtribute(id, count);
    return response > 0;
  }

  async deleteProyect(id: string, state: string): Promise<boolean> {
    const response = await this.delete(id, state);
    return response > 0;
  }
}

export default ProyectRepository;
