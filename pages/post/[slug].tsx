import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../lib/sanity";
import { Post } from "../../typings";
import moment from "moment";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />

      <div className="w-full h-[230px] relative overflow-hidden">
        <img
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          className="w-full h-fit brightness-90 absolute bottom-0"
        />
      </div>
      <article className="w-full flex justify-center">
        <div className="w-[800px] h-[200px] lg:px-12 px-6 pt-12 flex flex-col">
          <h1 className="font-bold text-3xl">{post.title}</h1>
          <p className="text-gray-500 text-lg mt-3">{post.description}</p>
          <div className="flex mt-3 items-center space-x-2">
            <div className="h-10 w-10 rounded-full  overflow-hidden">
              <img
                src={urlFor(post.author.image).url()}
                alt={post.title + "author-image"}
                className="w-full h-fit"
              />
            </div>
            <p className="text-gray-500 text-sm font-light">
              <span className="text-green-500">{post.author.name}</span> -
              Published at {moment(post._createdAt).format("DD/MM/YYYY")}
            </p>
          </div>

          <div className="mt-10 pb-10" >
            <PortableText
              className="space-y-5"
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
        _id,
        slug {
            current
        }
    }
    `;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        description,
        mainImage,
        slug,
        body
    }
    `;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
