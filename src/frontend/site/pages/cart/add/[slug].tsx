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

export async function getServerSideProps({
                                           params,
                                           locale,
                                           locales,
                                           preview,
                                         }: GetStaticPropsContext<{ slug: string }>) {
  let productId = parseInt(params!.slug, 10);
  await CartAPI.addCartListData({
    productId
  })

  return {
    props: {
      productId
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
                               productId,
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  setTimeout(() => {
    router.push('/cart')
    console.log("첫 번째 메시지")}, 3000);


  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      추가되었습니다
      <Link href={'/cart'} > 돌아가기 </Link>
    </div>
  )
}

Slug.Layout = Layout
