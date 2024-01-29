// pages/posts/[postId].js

import React from "react";

// Esta función obtiene la lista de todos los posibles postIds para la generación de páginas estáticas
export async function getStaticPaths() {
  // Aquí debes reemplazar con tu lógica para obtener los IDs de los posts
  // Por ejemplo, podría ser una llamada a una API o a una base de datos
  const posts = [{ id: "1" }, { id: "2" }]; // Ejemplo de datos de posts
  const paths = posts.map((post) => ({
    params: { postId: post.id },
  }));

  return { paths, fallback: false };
}

// Esta función obtiene los datos necesarios para renderizar la página del post
export async function getStaticProps({ params }) {
  // Aquí debes reemplazar con tu lógica para obtener los datos del post basado en params.postId
  // Esto podría ser una llamada a una API o a una base de datos
  const post = {
    id: params.postId,
    title: "Titulo del Post",
    content: "Contenido del Post",
  }; // Ejemplo de datos de un post

  return { props: { post } };
}

// Componente de la página del post
const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
