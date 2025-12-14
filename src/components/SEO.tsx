import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "OWN-it | Luxury Custom Jewelry & Diamonds",
  description = "Create your bespoke jewelry piece with OWN-it. Certified diamonds, lifetime warranty, and expert craftsmanship for rings, necklaces, and custom designs.",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://ownit-jewelry.com",
  type = "website"
}: SEOProps) => {
  const fullTitle = title.includes("OWN-it") ? title : `${title} | OWN-it`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
