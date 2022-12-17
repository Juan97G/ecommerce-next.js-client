import React from 'react';
import {Tab} from "semantic-ui-react";
import InfoGame from "../InfoGame";

const TabsGame = (props) => {

   /* DESTRUCTURING */
   const {game} = props;

   const panes = [
      {
         menuItem: "Información",
         // eslint-disable-next-line react/display-name
         render: () => (
            <Tab.Pane>
               <InfoGame game={game} />
            </Tab.Pane>
         )
      }
   ]

   return (
      <Tab className="tabs-game" panes={panes} />
   );
};

export default TabsGame;
