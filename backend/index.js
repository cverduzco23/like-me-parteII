const express = require("express");
const cors = require("cors");
const { getPosts, addPost, updateLikes, deletePost } = require("./queries");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async function (req, res) {
  const posts = await getPosts();
  res.json(posts);
});

app.post("/posts", async function (req, res) {
  const { titulo, img, descripcion } = req.body;

  try {
    const nuevoPost = await addPost(titulo, img, descripcion);
    res.status(201).json(nuevoPost); // Devolver el post completo
  } catch (error) {
    console.error("Error al agregar post:", error);
    res.status(500).json({ mensaje: "Error al agregar post" });
  }
});

app.put("/posts/:id", async function (req, res) {
  const { id } = req.params;
  const { likes } = req.query;

  try {
    await updateLikes(likes, id);
    res.send("Likes modificados con éxito");
  } catch (error) {
    const status = error.code || 500;
    const message = error.message || "Error interno del servidor";
    res.status(status).send(message);
  }
});

app.put("/posts/like/:id", async function (req, res) {
  const { id } = req.params;
  const { likes } = req.query;

  try {
    await updateLikes(likes, id);
    res.send("Likes modificados con éxito");
  } catch (error) {
    const status = error.code || 500;
    const message = error.message || "Error interno del servidor";
    res.status(status).send(message);
  }
});

app.delete("/posts/:id", async function (req, res) {
  const { id } = req.params;

  try {
    await deletePost(id);
    res.send("Post eliminado con éxito");
  } catch (error) {
    const status = error.code || 500;
    const message = error.message || "Error interno del servidor";
    res.status(status).send(message);
  }
});

app.listen(3000, function () {
  console.log("Servidor encendido en puerto 3000");
});
