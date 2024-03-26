import { BsFillBagFill } from "react-icons/bs";
import NotePlusOutline from 'mdi-material-ui/NotePlusOutline'
import Lottie from "react-lottie";
const Card = ({ img, title, star, searchQuery }) => {
  console.log("Lottie ANIMATION  ", img.split("?")[0]);
  return (
    <>
      <section className='card'>
        {/* <img src={img} alt={title} className="card-img" /> */}
        <div className={searchQuery == "wedding" ? 'card-wedding' : 'card-img'}>
          <Lottie
            // animationData={
            //   '/BIG_Color_Connected_Dynamic_Reveal_Ribbon_Grow_Shrink_Slanted_Stripe_Stylish_Slide_Text_Animation.json'
            // }
            //   loop={true}
            options={{
              speed: 10,
              renderer: 'svg',
              // animationData: img.split("?")[0],
              loop: true,
              autoplay: true,
              path: img?.split('?')[0]
              // rendererSettings: {
              //   preserveAspectRatio: 'xMidYMid slice'
              // }
            }}
            height={100}
            width={100}
          />
        </div>
        <div className='card-details'>
          <h3 className='card-title'>{title.length > 20 ? `${title.substring(0, 16)}...` : title}</h3>

          <section className='card-reviews'>
            <div>
              {star} {star} {star} {star}
              {/* <button onClick={() => {window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/studio?animPath=${img?.split('?')[0]}`)}} className="total-reviews">Add to canvas</button> */}
            </div>
            <NotePlusOutline
              size={40}
              onClick={() => {
                window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/studio?animPath=${img?.split('?')[0]}`)
              }}
            />
          </section>
          {/* <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section> */}
        </div>
      </section>
    </>
  )
};

export default Card;
