import { Helmet } from "react-helmet-async";

export default function MetaTags({ data }) {
    return (
        <>
            {data && (
                <Helmet>
                    <title>{data.title} - Starring</title>
                    <meta name="description" content={data.desc} />
                    <meta name="keywords" content="starring, clothing, fashion, comfortable clothing, stylish clothing, durable clothing, everyday wear, sustainable fashion, modern apparel, versatile wardrobe" />
                    <meta name="author" content="Starring" />
                </Helmet>
            )}
        </>
    );
}
