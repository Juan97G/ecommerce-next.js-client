import React, {useState, useEffect} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {size} from "lodash";
import {useRouter} from "next/router";
import {searchGamesApi} from "../api/game";
import {Loader} from "semantic-ui-react";
import ListGames from "../components/ListGames";

const Search = () => {

   /* STATES */
   const [games, setGames] = useState(null);

   /* ROUTER */
   const router = useRouter();

   /* USE EFFECT */
   useEffect(() => {
      document.getElementById("search-game").focus();
   }, []);

   useEffect(() => {
      (async () => {
         if(size(router.query.query) > 2){
            const response = await searchGamesApi(router.query.query);

            if(size(response) > 0) setGames(response);
            else setGames([]);
         } else {
            setGames([]);
         }
      })()
   }, [router.query]);
   


   return (
      <BasicLayout className="search">
         { !games && <Loader active>Buscando Juegos...</Loader> }
         { games && size(games) === 0 && (
            <div><h3>No se han encontrado juegos...</h3></div>
         ) }
         {size(games) > 0 && <ListGames games={games} />}
      </BasicLayout>
   );
};

export default Search;
