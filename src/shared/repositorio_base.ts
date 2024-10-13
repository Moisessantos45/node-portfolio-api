import { Model, ModelStatic } from "sequelize";

export class RepositorioBase<T extends Model> {
  protected model: ModelStatic<T>;
  protected defaultKey: string;

  constructor(model: ModelStatic<T>, defaultKey: string = "id") {
    this.model = model;
    this.defaultKey = defaultKey;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findAll();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async create(data: any): Promise<T> {
    return await this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<number> {
    const [affectedCount] = await this.model.update(data, {
      where: { id } as any,
    });
    return affectedCount;
  }

  async updateStatus(id: string, state: string): Promise<number> {
    const [affectedCount] = await this.model.update(
      { status: state },
      { where: { id } as any }
    );
    return affectedCount;
  }

  async updateAtribute(id: string, value: number): Promise<number> {
    const [affectedCount] = await this.model.update(
      { counter_likes: value },
      { where: { id } as any }
    );
    return affectedCount;
  }

  async delete(id: string, state: string): Promise<number> {
    const [affectedCount] = await this.model.update(
      { status: state },
      { where: { id } as any }
    );
    // const affectedCount = await this.model.destroy({ where: { id } as any });
    return affectedCount;
  }
}
