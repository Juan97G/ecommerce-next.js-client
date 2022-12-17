import React, {useState} from 'react';
import {Image, Modal} from "semantic-ui-react";
import Slider from "react-slick";
import {map} from "lodash";

const settings = {
   className: "carousel-screenshots",
   dots: false,
   infinite: true,
   speed: 500,
   slidesToShow: 2,
   swipeToSlide: true
}

const CarouselScreenshots = (props) => {

   /* DESTRUCTURING */
   const {title, screenshots} = props;

   /* STATES */
   const [showModal, setShowModal] = useState(false);
   const [urlImage, setUrlImage] = useState(null);

   /* FUNCTIONS */
   const openImage = (url) => {
      setShowModal(true);
      setUrlImage(url);
   }

   return (
      <>
         <Slider {...settings}>
            {
               map(screenshots, (screenshot) => (
                  <Image
                     key={screenshot.id}
                     src={screenshot.url}
                     alt={screenshot.name}
                     onClick={() => openImage(screenshot.url)}
                  />
               ))
            }
         </Slider>

         <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            size="large"
         >
            <Image
               src={urlImage}
               alt={title}
            />
         </Modal>
      </>
   );
};

export default CarouselScreenshots;
