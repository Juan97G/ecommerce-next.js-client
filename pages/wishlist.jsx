import React, {useState, useEffect} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {getFavoritesApi} from "../api/favorite";
import {size, forEach} from "lodash";
import useAuth from "../hooks/useAuth";
import ListGames from "../components/ListGames";
import {Loader} from "semantic-ui-react";


const Wishlist = () => {

   /* DESTRUCTURING */
   const {auth, logout} = useAuth();

   /* STATES */
   const [games, setGames] = useState(null);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getFavoritesApi(auth.idUser, logout);

         if(size(response) > 0){
            const gamesList = [];
            forEach(response, (data) => {
               gamesList.push(data.game);
            });

            setGames(gamesList);
         } else {
            setGames([]);
         }
      })()
   }, []);


   return (
      <BasicLayout className="wishlist">
         <div className="wishlist__block">
            <div className="title">Lista de Favoritos</div>

            <div className="data">
               { !games && <Loader active>Cargando Juegos...</Loader> }
               { games && size(games) === 0 && (
                  <div className="data__not-found"><h3>No tienes juegos en tu lista de favoritos...</h3></div>
               )}
               { size(games) > 0 && <ListGames games={games} /> }
            </div>
         </div>
      </BasicLayout>
   );
};

export default Wishlist;
