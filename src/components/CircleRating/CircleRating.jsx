import './CircleRating.css';
const CircleRating = ({ score }) => {
  let classname = 'rating';
  if (score < 3) classname += ' bad';
  if (score >= 3 && score < 5) classname += ' meh';
  if (score >= 5 && score < 7) classname += ' normal';
  if (score >= 7) classname += ' good';
  if (score === 0) classname = 'rating'


  return (
    <div className={`${classname}`}>
      <span>{score ? score : '-'}</span>
    </div>
  );
};

export default CircleRating;
