import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

const Ratings = ({value, text, color}) => {
    const fullStars = Math.floor(value)
    const halfStars = value - fullStars >= 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStars - halfStars
  return (
    <div className='flex items-center'>
        {[...Array(fullStars)].map((_, index) => (
            <StarOutlinedIcon key={index} className={`text-${color} ml-1`} />
        ))}

        {halfStars === 1 && <StarHalfOutlinedIcon className={`text-${color} ml-1`} />}

         {[...Array(emptyStar)].map((_, index) => (
            <StarBorderOutlinedIcon key={index} className={`text-${color} ml-1`} />
        ))}

        <span className={`rating-text ml-{2rem} text-${color}`}>{text && text}</span>
    </div>
  )
};

export default Ratings