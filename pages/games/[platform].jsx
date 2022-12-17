import React, {useState, useEffect} from 'react';
import BasicLayout from "../../layouts/BasicLayout";
import {useRouter} from "next/router";
import {getGamesPlatformApi, getTotalGamesPlatformApi} from "../../api/game";
import {size} from "lodash";
import {Loader} from "semantic-ui-react";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";

const limitPerPage = 5;

const Platform = () => {
   
   /* STATES */
   const [games, setGames] = useState(null);
   const [totalGames, setTotalGames] = useState(null);

   /* HOOKS */
   const router = useRouter();

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         if(router.query.platform){
            const response = await getGamesPlatformApi(router.query.platform, limitPerPage, getStartItem());
            setGames(response);
         }
      })()
   }, [router.query])

   useEffect(() => {
      (async () => {
         const response = await getTotalGamesPlatformApi(router.query.platform);
         setTotalGames(response);
      })()
   }, [router.query]);
   
   
   /* FUNCTIONS */
   const getStartItem = () => {
      const currentPage = parseInt(router.query.page);

      if(!router.query.page || currentPage === 1) return 0;
      else return currentPage * limitPerPage - limitPerPage;
   }


   return (
      <BasicLayout className="platform">
         {!games && <Loader active>Cargando juegos para esta plataforma...</Loader>}
         {games && size(games) === 0 && (
            <div><h3>No existen juegos para esta plataforma...</h3></div>
         )}

         {size(games) > 0 && (
            <ListGames games={games} />
         )}

         { totalGames
            ? <Pagination
                  totalGames={totalGames}
                  page={router.query.page ? parseInt(router.query.page) : 1}
                  limitPerPage={limitPerPage}
              />
            : null
         }
      </BasicLayout>
   );
};

export default Platform;
