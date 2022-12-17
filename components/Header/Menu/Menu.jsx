import React, {useState, useEffect} from 'react';
import {Container, Menu as Menuweb, Grid, Icon, Label} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import {map} from "lodash";
import {getMeApi} from "../../../api/user";
import {getPlatformsApi} from "../../../api/platform";
import useCart from "../../../hooks/useCart";

const Menu = () => {

   /* STATES */
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("Iniciar Sesión");
   const [user, setUser] = useState(undefined);
   const [platforms, setPlatforms] = useState([]);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getMeApi(logout);
         setUser(response);
      })();
   }, [auth]);

   useEffect(() => {
      (async () => {
         const response = await getPlatformsApi();
         setPlatforms(response || []);
      })()
   }, []);



   /* DESTRUCTURING */
   const {auth, logout} = useAuth();
   const {productsCart} = useCart();

   /* FUNCTIONS */
   const onShowModal = () => setShowModal(true);
   const onCloseModal = () => setShowModal(false);

   return (
      <div className="menu">
         <Container>
            <Grid>
               <Grid.Column className="menu__left" width={6}>
                  <Menuweb>
                     { map(platforms, (platform) => (
                        <Link href={`/games/${platform.url}`} key={platform._id}>
                           <Menuweb.Item as="a">{platform.title}</Menuweb.Item>
                        </Link>
                     )) }

                  </Menuweb>
               </Grid.Column>
               <Grid.Column className="menu__right" width={10}>
                  {  user !== undefined && (
                     <Menuweb>
                        { user
                           ? (
                              <>
                                 <Link href="/orders">
                                    <Menuweb.Item as="a">
                                       <Icon name="game" />
                                       Mis Pedidos
                                    </Menuweb.Item>
                                 </Link>
                                 <Link href="/wishlist">
                                    <Menuweb.Item as="a">
                                       <Icon name="heart outline" />
                                       Favoritos
                                    </Menuweb.Item>
                                 </Link>
                                 <Link href="/account">
                                    <Menuweb.Item as="a">
                                       <Icon name="user outline" />
                                       {user.name} {user.lastname}
                                    </Menuweb.Item>
                                 </Link>
                                 <Link href="/cart">
                                    <Menuweb.Item as="a" className="m-0">
                                       <Icon name="cart" />
                                       {productsCart > 0 && (
                                          <Label color="red" floating circular>
                                             {productsCart}
                                          </Label>
                                       )}
                                    </Menuweb.Item>
                                 </Link>
                                 <Menuweb.Item onClick={logout} className="m-0">
                                    <Icon name="power off" />
                                 </Menuweb.Item>
                              </>
                             )
                           : (
                              <Menuweb.Item onClick={onShowModal}>
                                 <Icon name="user outline" />
                                 Mi Cuenta
                              </Menuweb.Item>
                             )
                        }
                     </Menuweb>
                     )
                  }
               </Grid.Column>
            </Grid>
         </Container>

         <BasicModal
            show={showModal}
            setShow={setShowModal}
            title={titleModal}
            size="small"
         >
            <Auth
               onCloseModal={onCloseModal}
               setTitleModal={setTitleModal}
            />
         </BasicModal>
      </div>
   );
};

export default Menu;