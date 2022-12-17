import React, {useState, useEffect} from 'react';
import {Grid, Image, Icon, Button} from "semantic-ui-react";
import {size} from "lodash";
import {addFavoriteApi, isFavoriteApi, removeFavoriteApi} from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import classNames from "classnames";

const HeaderGame = (props) => {

   /* DESTRUCTURING */
   const {game} = props;
   const {auth, logout} = useAuth();
   const {addProductCart} = useCart();

   /* STATES */
   const [isFavorite, setIsFavorite] = useState(false);
   const [reloadFavorite, setReloadFavorite] = useState(false);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await isFavoriteApi(auth.idUser, game.id, logout);

         if(size(response) > 0) setIsFavorite(true);
         else setIsFavorite(false);
      })();

      setReloadFavorite(false);
   }, [game, reloadFavorite]);

   /* FUNCTIONS */
   const addFavorite = async () => {
      if(auth){
         await addFavoriteApi(auth.idUser, game.id, logout);
         setReloadFavorite(true);
      }
   }

   const removeFavorite = async () => {
      if(auth){
         await removeFavoriteApi(auth.idUser, game.id, logout);
         setReloadFavorite(true);
      }
   }



   return (
      <Grid className="header-game">
         <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={game.poster.url} alt={game.title} fluid />
         </Grid.Column>
         <Grid.Column mobile={16} tablet={10} computer={11}>
            <div className="header-game__title">
               {game.title}
               <Icon
                  name={isFavorite ? "heart" : "heart outline"}
                  className={classNames({
                     like: isFavorite
                  })}
                  onClick={isFavorite ? removeFavorite : addFavorite}
                  link
               />
            </div>
            <div className="header-game__delivery">Entrega entre 24/48 horas</div>
            <div
               className="header-game__summary"
               dangerouslySetInnerHTML={{__html: game.summary}}
            />
            <div className="header-game__buy">
               <div className="header-game__buy-price">
                  <p>Precio de venta al público: ${game.price}</p>
                  <div className="header-game__buy-price-actions">
                     <p>-{game.discount}%</p>
                     <p>${game.price - Math.floor(game.price * game.discount) / 100}</p>
                  </div>
               </div>
               <Button
                  className="header-game__buy-btn"
                  onClick={() => addProductCart(game.url)}
               >
                  Comprar
               </Button>
            </div>
         </Grid.Column>
      </Grid>
   );
};

export default HeaderGame;
