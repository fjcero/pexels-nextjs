import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Layout } from "../components/Layout";
import { getCurated, Photo } from "../libs/pexels";
import styles from "../styles/Home.module.css";

const PER_PAGE = 10;
const photosQueryId = "photos";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  const queryClient = new QueryClient();

  if (context.query.page) {
    page = parseInt(String(context.query.page));
  }

  await queryClient.prefetchQuery([photosQueryId], async () => [
    await getCurated(page, PER_PAGE),
  ]);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Home: NextPage = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [photosQueryId],
    async ({ pageParam = 1 }) => await getCurated(pageParam, PER_PAGE),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getPreviousPageParam: (firstPage: any) => {
        const url = new URL(firstPage?.next_page);
        const page = Number(url.searchParams.get("page"));
        return page > 2 ? page - 2 : 1;
      },
      getNextPageParam: (lastPage: any) => {
        const url = new URL(lastPage?.next_page);
        const page = Number(url.searchParams.get("page"));
        return page;
      },
    }
  );

  const pagesLength = Number(data?.pages?.length || 1);

  useEffect(() => {
    if (inView && pagesLength < 10) {
      fetchNextPage();
    }
  }, [pagesLength, fetchNextPage, inView]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pexels Nextjs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className={styles.title}>Pexel + Next.js!</h1>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {(error as any)?.message}</span>
        ) : (
          <section className="container">
            <div className="flex flex-wrap justify-center">
              {data?.pages?.map((page: any) => (
                <Fragment key={page.next_page}>
                  {page.photos?.map((image: Photo) => (
                    <div
                      key={image.id}
                      className="flex m-4 p-4 relative w-[360px] h-[582px] rounded-md drop-shadow-lg image-card"
                      style={{ backgroundColor: image.avg_color }}
                    >
                      <Image
                        src={image.src.large2x}
                        alt={image?.alt}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={image.src.medium}
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </section>
        )}
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </Layout>
    </div>
  );
};

export default Home;
