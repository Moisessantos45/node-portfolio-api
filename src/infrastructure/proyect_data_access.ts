import { TypeProyectsCreate } from "../domains/proyect_entity";
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

  async createProyect(proyect: Partial<Proyect>): Promise<boolean> {
    return this.create(proyect).then(() => true);
  }

  async updateProyect(
    id: string,
    proyect: TypeProyectsCreate
  ): Promise<boolean> {
    return this.update(id, proyect).then(() => true);
  }

  async deleteProyect(id: string, state: string): Promise<boolean> {
    return this.delete(id, state).then(() => true);
  }
}

export default ProyectRepository;
