const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
        >
        </div>
    );
    }

export default PrevArrow