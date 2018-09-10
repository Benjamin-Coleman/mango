import React from "react";
import Helmet from "react-helmet-async";
import getMeta, { baseUrl } from "./config/meta";

const AppMeta = ({ appTheme }) => {
  const meta = getMeta(appTheme);

  return (
    <Helmet
      defaultTitle={`${meta.title} — ${meta.shortDescription}`}
      titleTemplate={`%s — ${meta.title}`}
    >
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5"
      />
      <meta name="robots" content="noodp" />

      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.openGraphImage} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}`} />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.iconUrl} />
      <meta property="twitter:site" content={`@${meta.twitterName}`} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:url" content={`${baseUrl}`} />

      <meta name="application-name" content={meta.title} />
      <meta name="description" content={meta.shortDescription} />
      <meta name="theme-color" content={meta.themeColor} />

      <link rel="icon" href={meta.favicon} />
      <link rel="manifest" href={meta.manifest} />

      <link
        type="application/opensearchdescription+xml"
        rel="search"
        href="/public/meta/opensearch.xml"
      />

      <meta name="apple-mobile-web-app-title" content={meta.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <link rel="apple-touch-startup-image" href={meta.iconUrl} />
      <link rel="apple-touch-icon" href={meta.iconUrl} />

      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />

      <meta
        name="google-site-verification"
        content="PMxjYwLtMYRTziqxwX_i4UmRrsQNnDRLehhWzhVYKBA"
      />
    </Helmet>
  );
};

export default AppMeta;
