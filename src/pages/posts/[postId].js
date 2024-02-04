import React from "react";

export async function getStaticPaths() {
  const posts = [{ id: "1" }, { id: "2" }];
  const paths = posts.map((post) => ({
    params: { postId: post.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = {
    id: params.postId,
    title: "Titulo del Post",
    content: "Contenido del Post",
  };

  return { props: { post } };
}

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
