import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

function MoreInfo() {
  return (
    <div className="moreinfo_component mx-90 p-10 pr-0 mb-[2rem]">
      <div className="grid grid-cols-3">
        <div className="moreInfo-wrapper">
          <div className='flex items-center gap-4'>
            <p className='text-black'><LocalShippingIcon fontSize='large'/></p>
            <div>
              <h4 className='text-base text-black capitalize font-inter italic font-medium mb-1'>Giao hàng miễn phí</h4>
              
              <h4 className='text-base text-lime-400 capitalize font-inter italic font-medium'>Mọi lúc mọi nơi</h4>
            </div>
          </div>
        </div>
        <div className="moreInfo-wrapper">
          <div className='flex items-center gap-4'>
            <p className='text-black'><SupportAgentIcon fontSize='large'/></p>
            <div>
              <h4 className='text-base text-black capitalize font-inter italic font-medium mb-1'>Hỗ trợ trực tiếp</h4>
              
              <h4 className='text-base text-lime-400 capitalize font-inter italic font-medium'>Nhiệt tình</h4>
            </div>
          </div>
        </div>
        <div className="moreInfo-wrapper">
          <div className='flex items-center gap-4'>
            <p className='text-black'><EmojiFoodBeverageIcon fontSize='large'/></p>
            <div>
              <h4 className='text-base text-black capitalize font-inter italic font-medium mb-1'>Thanh toán trực tuyến</h4>
              
              <h4 className='text-base text-lime-400 capitalize font-inter italic font-medium'>Hoàn tiền 100%</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreInfo