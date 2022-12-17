import React from 'react';
import Head from 'next/head';

const Seo = (props) => {

   /* DESTRUCTURING */
   const {title, description} = props;


   return (
      <Head>
         <title>{title}</title>
         <meta property="description" content={description} />
      </Head>
   );
};

Seo.defaultProps = {
   title: "Gaming - Tus mejores juegos",
   description: "Aquí encuentras tus juegos favoritos para todas las consolas y plataformas."
}

export default Seo;
