import ProductCard from "../../src/components/ProductCard";
import {ProductAPI} from "../../src/components/api/productApi";
import Container from "@mui/material/Container";
export async function getServerSideProps({
                                             params,
                                         }) {

    const product = await ProductAPI.loadProductData({
        productId: parseInt(params.id, 10)
    });

    return {
        props: {
            product: product,
        },
    }
}

export default function ProductPage({
                                 product,

                             }) {
    return <Container maxWidth="sm">
        <ProductCard product={product}/>
    </Container>
}