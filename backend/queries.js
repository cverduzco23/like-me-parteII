const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'likeme',
  allowExitOnIdle: true
});

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function addPost(titulo, img, descripcion) {
  const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Devuelve el post insertado
}

async function updateLikes(likes, id) {
  const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
  const values = [likes, id];
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw { code: 404, message: "Post no encontrado" };
  }
}

async function deletePost(id) {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw { code: 404, message: "Post no encontrado" };
  }
}

module.exports = { getPosts, addPost, updateLikes, deletePost };


