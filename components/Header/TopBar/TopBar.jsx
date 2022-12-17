import React, {useState, useEffect} from "react";
import {Container, Grid, Image, Input} from "semantic-ui-react";
import {useRouter} from "next/router";
import Link from "next/link";


const TopBar = () => {

   /* STATES */
   const [searchStr, setSearchStr] = useState("");
   const [load, setLoad] = useState(false);

   /* ROUTER */
   const router = useRouter();

   /* USE EFFECT */
   useEffect(() => {
      if(load) router.push(`/search?query=${searchStr}`);

      setLoad(true);
   }, [searchStr]);


   return (
      <div className="top-bar">
         <Container>
            <Grid className="top-bar">
               <Grid.Column width={8} className="top-bar__left">
                  <Link href="/">
                     <a><Image src="/logo.png" alt="Logo gaming" /></a>
                  </Link>
               </Grid.Column>
               <Grid.Column width={8} className="top-bar__right">
                  <Input
                     id="search-game"
                     icon={{name: "search"}}
                     value={router.query.query}
                     onChange={(_, data) => setSearchStr(data.value)}
                  />
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   );
};

export default TopBar;