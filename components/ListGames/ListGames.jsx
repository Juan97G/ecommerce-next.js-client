import React from 'react';
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {map} from "lodash";
import {Image, Grid} from "semantic-ui-react";
import {breakpointUpSm, breakpointUpMd, breakpointUpLg} from "../../utils/breakpoints";

const ListGames = (props) => {

   /* DESTRUCTURING */
   const {games} = props;
   const {width} = useWindowSize();

   /* FUNCTIONS */
   const getColumnsRender = () => {
      switch (true) {
         case width > breakpointUpLg:
            return 5;
         case width > breakpointUpMd:
            return 3;
         case width > breakpointUpSm:
            return 2;
         default:
            return 1;

      }
   }


   return (
      <div className="list-games">
         <Grid>
            <Grid.Row columns={getColumnsRender()}>
               {map(games, (game) => (
                  <Game game={game} key={game._id} />
               ))}
            </Grid.Row>
         </Grid>
      </div>
   );
};

export default ListGames;


const Game = (props) => {
   const {game} = props;

   return (
      <Grid.Column className="list-games__game">
         <Link href={`/${game.url}`}>
            <a>
               <div className="list-games__game-poster">
                  <Image src={game.poster.url} alt={game.title} />
                  <div className="list-games__game-poster-info">
                     {game.discount ? (
                        <span className="discount">-{game.discount}%</span>
                     ) : (
                        <span />
                     )}

                     <span className="price">${game.price} COP</span>
                  </div>
               </div>

               <h2>{game.title}</h2>
            </a>
         </Link>
      </Grid.Column>
   )
}
