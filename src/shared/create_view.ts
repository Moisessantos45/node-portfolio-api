import db from "./dbConnection";

const createProyectsView = async () => {
  try {
    const createViewQuery = `
    CREATE VIEW IF NOT EXISTS v_Proyects AS
    SELECT
      id,
      title,
      typeProyect,
      description,
      tecnologies,
      caracteristicas,
      image,
      imagenesProyect,
      link,
      link_gitHub,
      createdAt,
      status
    FROM
      proyects;
  `;
    await db.query(createViewQuery);
    console.log("View created successfully");
  } catch (error) {
    console.log(error);
  }
};

const consultProyectsView = async () => {
  try {
    const consultViewQuery = `
        SELECT * FROM v_Proyects;
    `;
    const result = await db.query(consultViewQuery);
    const data = result[0];
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { createProyectsView, consultProyectsView };
