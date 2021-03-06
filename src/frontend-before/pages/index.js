import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SearchAPI} from "../src/components/api/searchApi";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/components/ProTip';
import Link from '../src/components/Link';
import Copyright from '../src/components/Copyright';
import {ProductAPI} from "../src/components/api/productApi";
import ProductCard from "../src/components/ProductCard";

export const getServerSideProps = async () => {
    const products = await ProductAPI.loadProductListData();
    return {
        props: {
            products: products
        },
    }
}

export default function Home({products}) {
    return (
        <div className={styles.container}>
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Next.js example
                    </Typography>
                    <Link href="/about" color="secondary">
                        Go to the about page
                    </Link>
                    <ProTip />
                    <Copyright />
                </Box>
            </Container>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div style={{color: 'blue'}}>
                    {products.map(product => {
                        return <ProductCard product={product} />
                    })}
                </div>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js</a> on Docker!
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/canary/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    )
}
