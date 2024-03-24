import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
//npm i swiper
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams()
    const [listing,setListing]=useState(null)
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    console.log(listing)
    useEffect(() => {
        const fetchListing = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/listing/getListing/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchListing();
      }, [params.listingId]);
  return (
    <main>
        {loading&&<p className="text-green-600 text-center text-lg font-semibold my-5">Loading....</p>}
        {error&&<p className="text-red-500 text-center text-lg font-semibold my-5">Someting is wrong....</p>}
        {listing && !loading && !error && (
            <div>
                 <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[580px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
            </div>
        )}
        {/* <p>{listing.name}</p> */}
    </main>
  )
}

export default Listing