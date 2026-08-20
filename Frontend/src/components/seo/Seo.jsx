import { Helmet } from "react-helmet-async";
import { APP_NAME } from "../../utils/constants";

const Seo = ({ title, description, path = "/" }) => {
  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const pageDescription =
    description || "Invoice Generator helps freelancers manage clients, invoices, and payments.";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
    </Helmet>
  );
};

export default Seo;