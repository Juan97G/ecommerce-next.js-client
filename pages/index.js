import React, {useState, useEffect} from "react";
import BasicLayout from "../layouts/BasicLayout";
import {Loader} from "semantic-ui-react";
import {getLastGamesApi} from "../api/game";
import {size} from "lodash";
import ListGames from "../components/ListGames";
import Seo from "../components/SEO";

export default function Home() {

   /* STATES */
   const [games, setGames] = useState(null);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getLastGamesApi(10);

         if(size(response) > 0) setGames(response);
         else setGames([]);
      })()
   }, []);



   return (
      <>
         <BasicLayout className="home">
            <Seo />
            { !games && <Loader active>Cargando Videojuegos</Loader> }
            { games && size(games) === 0 && (
               <div>
                  <h3>No hay juegos...</h3>
               </div>
            )}

            { size(games) > 0 && <ListGames games={games} /> }
         </BasicLayout>
      </>
   )
}
