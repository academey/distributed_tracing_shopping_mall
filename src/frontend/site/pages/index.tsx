import commerce from '@lib/api/commerce'
import {Layout} from '@components/common'
import {ProductCard} from '@components/product'
import {Grid, Marquee, Hero} from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type {GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType} from 'next'
import {SearchAPI} from "@components/api/searchApi";
import {ProductAPI} from "@components/api/productApi";
import productCard from "@components/product/ProductCard";

// export async function getServerSideProps({}) {
//   try {
//     const purchaseItemList = await SearchAPI.loadPurchaseItemList();
//     const searchListData = await SearchAPI.loadSearchListData();
//     return {
//       props: {
//         purchaseItemList,
//         searchListData
//       },
//     }
//   } catch (e) {
//     return {
//       props: {
//         purchaseItemList: [],
//         searchListData: []
//       },
//     }
//   }
// }

export async function getServerSideProps({
                                           preview,
                                           locale,
                                           locales,
                                         }: GetStaticPropsContext) {
  const config = {locale, locales}
  const productsPromise = commerce.getAllProducts({
    variables: {first: 6},
    config,
    preview,
    // Saleor provider only
    ...({featured: true} as any),
  })
  const pagesPromise = commerce.getAllPages({config, preview})
  const siteInfoPromise = commerce.getSiteInfo({config, preview})
  const {products} = await productsPromise

  const {pages} = await pagesPromise
  const {categories, brands} = await siteInfoPromise


  const myProducts = await ProductAPI.loadProductListData();
  console.log(products);
  console.log(products[0].images);
  console.log("hihihi");

  console.log(myProducts);

  const convertedProducts = myProducts.map((myProduct: any) => {
    return {
      id: myProduct.id,
      name: myProduct.title,
      vendor: myProduct.brand,
      path: `/${myProduct.id}`,
      slug: myProduct.id,
      price: {
        value: myProduct.price,
        currencyCode: 'USD'
      },
      descriptionHtml: `<p><span>${myProduct.info}&nbsp;</span><strong>limited edition</strong><span>&nbsp;${myProduct.explain}</strong></p>`,
      images: [
        {
          url: myProduct.image,
          altText: myProduct.title,
          width: 1000,
          height: 1000
        }
      ],
      variants: [],
      options: [],
    }
  });

  return {
    props: {
      products: convertedProducts,
      categories,
      brands,
      pages,
    },
  }
}

export default function Home({products}: InferGetServerSidePropsType<typeof getServerSideProps>
                             // {
                             //   products,
                             // }: InferGetStaticPropsType<typeof getStaticProps>

) {
  return (
    <>
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim"/>
        ))}
      </Marquee>
      <Hero
        headline="창의설계 3"
        description="분산 추적이 가능한 쇼핑몰입니다"
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim"/>
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
