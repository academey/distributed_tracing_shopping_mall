import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import {useRouter} from 'next/router'
import commerce from '@lib/api/commerce'
import {Layout} from '@components/common'
import {ProductView} from '@components/product'
import {InferGetServerSidePropsType} from "next";
import {ProductAPI} from "@components/api/productApi";
import {Product} from "@commerce/types/product";
import {CartAPI} from "@components/api/cartApi";
import Link from "next/link";
import {CheckoutAPI} from "@components/api/checkoutApi";

export async function getServerSideProps({
                                           params,
                                           locale,
                                           locales,
                                           preview,
                                         }: GetStaticPropsContext<{ slug: string }>) {
  await CheckoutAPI.checkout();

  return {
    props: {
    },
  }
}

//
// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//   const { products } = await commerce.getAllProductPaths()
//
//   return {
//     paths: locales
//       ? locales.reduce<string[]>((arr, locale) => {
//           // Add a product path for every locale
//           products.forEach((product: any) => {
//             arr.push(`/${locale}/product${product.path}`)
//           })
//           return arr
//         }, [])
//       : products.map((product: any) => `/product${product.path}`),
//     fallback: 'blocking',
//   }
// }

export default function Slug({
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  setTimeout(() => {
    router.push('/cart')
    console.log("체크아웃 완료했습니다")}, 3000);


  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      체크아웃 완료했습니다
      <Link href={'/cart'} > 돌아가기 </Link>
    </div>
  )
}

Slug.Layout = Layout
