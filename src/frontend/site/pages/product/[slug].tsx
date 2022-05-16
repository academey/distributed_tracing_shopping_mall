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

export async function getServerSideProps({
                                           params,
                                           locale,
                                           locales,
                                           preview,
                                         }: GetStaticPropsContext<{ slug: string }>) {
  const config = {locale, locales}
  const pagesPromise = commerce.getAllPages({config, preview})
  const siteInfoPromise = commerce.getSiteInfo({config, preview})
  // const productPromise = commerce.getProduct({
  //   variables: {slug: params!.slug},
  //   config,
  //   preview,
  // })

  const allProductsPromise = commerce.getAllProducts({
    variables: {first: 4},
    config,
    preview,
  })
  const {pages} = await pagesPromise
  const {categories} = await siteInfoPromise
  // const {product} = await productPromise
  const {products: relatedProducts} = await allProductsPromise

  const myProduct = await ProductAPI.loadProductData({
      productId: parseInt(params!.slug, 10)
      // productId: 1
    }
  );

  console.log('myProduct is ', myProduct);
  const convertedProduct: Product = {
    id: myProduct.id,
    name: myProduct.title,
    vendor: myProduct.brand,
    description: myProduct.info,
    path: `/${myProduct.id}`,
    slug: myProduct.id,
    price: {
      value: myProduct.price,
      currencyCode: 'USD'
    },
    descriptionHtml: `<p><span>${myProduct.info}&nbsp;</span><strong>limited edition</strong><span>&nbsp;</strong></p>`,
    images: [
      {
        url: myProduct.image,
        alt: myProduct.title,
        // altText: myProduct.title,
        // width: 1000,
        // height: 1000
      }
    ],
    variants: [
      {
        id: "Z2lkOi8vc2hvcGlmeS9Qcms9kdWN0LzU0NDczMjUwMjQ0MjAss=",
        options: [
          {
            __typename: "MultipleChoiceOption",
            id: "asd",
            displayName: "Size",
            values:
              [
                {label: "XL"}
              ]
          }
        ]
      }
    ],
    options: [
      {
        id: "option-color",
        displayName: "Color",
        values: [{
          label: "color",
          hexColors: ["#222"]
        }]
      }

    ]
  }
  return {
    props: {
      pages,
      product: convertedProduct,
      relatedProducts,
      categories,
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
                               product,
                               relatedProducts,
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts}/>
  )
}

Slug.Layout = Layout
