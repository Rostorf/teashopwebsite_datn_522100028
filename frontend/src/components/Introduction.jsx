import { assets } from "../assets/assets"

function Introduction() {
  return (
    <div>

        <div className="mx-auto lg:container p-[5rem] grid grid-cols-2 gap-9 relative">
          <img src={assets.introduction} alt="Introduction" className="h-[100%] w-[100%]"/>

          <div>
            <p className="font-sm font-inter text-2xl text-[#3a6b35] mb-6">Về chúng tôi</p>
            <h1 className="font-bold font-inter text-5xl mb-6 tracking-wide">Trà cao cấp đến từ Việt Nam</h1>
            <p className="tracking-wider">"Never doubt that a small group of thoughtful, committed people can change the world. Indeed, it is the only thing that ever has." – Margaret Mead
            Rostea is a family-owned organic tea company based in Ann Arbor, Michigan. Our daily mission is to find the world's most fantastic organic teas and deliver them to you as sustainably as possible.
            We love what we do. And what’s not to love? We work with some of the world’s most fascinating, delicious, and healthy products. We get to sell goods that we proudly stand behind to amazing people. Our concern for environmental sustainability and social welfare inspires us to be an agent of positive change in the world. And we have a blast doing it every day, with the best team imaginable. A day isn’t complete without animated conversation and fits of laughter around our lunch table!
            Rostea was founded by husband and wife team Aubrey and Jeremy Lopatin in 2004.</p>
            {/* <a href="/shop">
              <button className="bg-lime-600 hover:bg-lime-800 text-white hover:text-white font-semibold py-3 px-8 transition duration-300 flex items-center mt-8">
                Khám phá sản phẩm từ chúng tôi
              </button>
            </a> */}
          </div>
        </div>

        <div className="mx-auto lg:container p-[5rem] grid grid-cols-2 gap-9 relative">
          <div>
            <p className="font-sm font-inter text-2xl text-[#3a6b35] mb-6">Uy Tín và Chất Lượng</p>
            <h1 className="font-bold font-inter text-5xl mb-6 tracking-wide">Tin tưởng bởi khách hàng</h1>
            <p className="tracking-wider">Any tea devotee knows that not all teas are created equal. Realizing this, we at Rostea perform extensive comparative tasting whenever we consider adding a new tea to our catalog. If it isn’t up to snuff, we simply won’t offer it. In addition, we meticulously manage our inventory of teas and store them in temperature controlled “cold” rooms, to maintain maximum freshness. We strive to offer only the best organic and Fair Trade Certified® teas and herbs in the world!
            We select our inventory with quality, organic certification, and Fair Trade certification in mind. First and foremost, we search for organic certified teas that represent classic manufacturing styles from around the world.  And we have a blast doing it every day, with the best team imaginable. A day isn’t complete without animated conversation and fits of laughter around our lunch table!
            Rostea was founded by husband and wife team Aubrey and Jeremy Lopatin in 2004. Our company has grown a bit since its humble beginnings when our first website was built in exchange for painting our friend’s kitchen! As we’ve grown, so has our enthusiasm, our focus, and our convictions. We hope this shows in our work. Now, Aubrey is at the helm and Rostea is proud to be owned and operated by an all women team including several mother-daughter duos.</p>
            {/* <a href="/shop">
              <button className="bg-lime-600 hover:bg-lime-800 text-white hover:text-white font-semibold py-3 px-8 transition duration-300 flex items-center mt-8">
                Khám phá sản phẩm từ chúng tôi
              </button>
            </a> */}
          </div>
        <img src={assets.teabg3} alt="Introduction" className="h-[100%] w-[100%]"/>
        </div>

        <div className="mx-auto lg:container p-[5rem] grid grid-cols-2 gap-9 relative">
          <img src={assets.teabg4} alt="Introduction" className="h-[100%] w-[100%]"/>

          <div>
            <p className="font-sm font-inter text-2xl text-[#3a6b35] mb-6">Những Lá Trà</p>
            <h1 className="font-bold font-inter text-5xl mb-6 tracking-wide">Được nhập trực tiếp từ Tây Nguyên</h1>
            <p className="tracking-wider">"Never doubt that a small group of thoughtful, committed people can change the world. Indeed, it is the only thing that ever has." – Margaret Mead
            Rostea is a family-owned organic tea company based in Ann Arbor, Michigan. Our daily mission is to find the world's most fantastic organic teas and deliver them to you as sustainably as possible.
            We love what we do. And what’s not to love? We work with some of the world’s most fascinating, delicious, and healthy products. We get to sell goods that we proudly stand behind to amazing people. Our concern for environmental sustainability and social welfare inspires us to be an agent of positive change in the world. And we have a blast doing it every day, with the best team imaginable. A day isn’t complete without animated conversation and fits of laughter around our lunch table!
            Rostea was founded by husband and wife team Aubrey and Jeremy Lopatin in 2004.</p>
            <a href="/shop">
              <button className="bg-lime-600 hover:bg-lime-800 text-white hover:text-white font-semibold py-3 px-8 transition duration-300 flex items-center mt-8">
                Khám phá thêm sản phẩm từ chúng tôi
              </button>
            </a>
          </div>
        </div>


    </div>
  )
}

export default Introduction