import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MediumSmallLogo from "../public/assets/images/mediumsmall.png";
import { sanityClient, urlFor } from "../lib/sanity";
import { Post } from "../typings";
import Link from "next/link";
import Image from "next/image";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href={MediumSmallLogo.src} />
      </Head>

      <Header />
      <Hero />

      <div className="w-full h-auto flex flex-wrap justify-center px-4 py-8">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="w-[300px] h-[350px] border rounded-lg shadow-lg hover:shadow-xl transition-all group hover:scale-[1.01] cursor-pointer flex flex-col justify-between items-center m-4"
            >
              <Link href={`/post/${post.slug.current}`}>
                <div className="h-[150px] w-full">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={`${post.title}-main-image`}
                    width={300}
                    height={0}
                    className="rounded-t-lg group-hover:opacity-90 h-full transition-opacity"
                  />
                </div>
              </Link>
              <div className="p-4 w-full  flex flex-col">
                <h1 className=" font-bold line-clamp-2 overflow-hidden text-ellipsis  text-xl box-content">
                  {post.title}
                </h1>
                <p className="text-sm mt-2 whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
                  {post.description}
                </p>
              </div>
              <div className="w-full  flex flex-row items-end h-full ">
                <div className="w-1/2 h-full flex flex-row items-end px-4 pb-3">
                  <p className=" text-slate-500">{post.author.name}</p>
                </div>
                <div className="w-1/2 pb-3 h-full px-4 flex flex-row items-end justify-end">
                  <div className="w-10 h-10 rounded-full overflow-hidden ">
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={`${post.title}-main-image`}
                      width={300}
                      height={0}
                      className="rounded-t-lg h-fit w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
      title,
      author -> {
        name,
          image
      },
      description,
      mainImage,
      slug
  }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
