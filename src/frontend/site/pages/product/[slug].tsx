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
  const productPromise = commerce.getProduct({
    variables: {slug: params!.slug},
    config,
    preview,
  })

  const allProductsPromise = commerce.getAllProducts({
    variables: {first: 4},
    config,
    preview,
  })
  const {pages} = await pagesPromise
  const {categories} = await siteInfoPromise
  const {product} = await productPromise
  const {products: relatedProducts} = await allProductsPromise

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  // {"id":"Z2lkOis8vc2hvcGlmsddeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=","name":"Shirt","vendor":"Next.js","path":"/shirt","slug":"shirt","price":{"value":25,"currencyCode":"USD"},"descriptionHtml":"<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>","images":[{"url":"/assets/t-shirt-0.png","altText":"Shirt","width":1000,"height":1000},{"url":"/assets/t-shirt-1.png","altText":"Shirt","width":1000,"height":1000},{"url":"/assets/t-shirt-2.png","altText":"Shirt","width":1000,"height":1000},{"url":"/assets/t-shirt-3.png","altText":"Shirt","width":1000,"height":1000},{"url":"/assets/t-shirt-4.png","altText":"Shirt","width":1000,"height":1000}],"variants":[{"id":"Z2lkOi8vc2hvcGlmeS9Qcms9kdWN0LzU0NDczMjUwMjQ0MjAss=","options":[{"__typename":"MultipleChoiceOption","id":"asd","displayName":"Size","values":[{"label":"XL"}]}]}],"options":[{"id":"option-color","displayName":"Color","values":[{"label":"color","hexColors":["#222"]}]},{"id":"option-size","displayName":"Size","values":[{"label":"S"},{"label":"M"},{"label":"L"}]}]}


  console.log('product is ', product);
  console.log('product is ', JSON.stringify(product));
  console.log('variants is ', JSON.stringify(product.variants[0]));
  console.log('variants is ', product.variants[0].options);
  console.log('options is ', JSON.stringify(product.options[0]));
  console.log('options is ', product.options[0].values);

  const myProduct = await ProductAPI.loadProductData({
      // productId: parseInt(params!.slug, 10)
      productId: 1
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
