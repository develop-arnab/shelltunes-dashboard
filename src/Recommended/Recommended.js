import Button from "../components/search/Button";
// import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className='recommended-title'>Recommended</h2>
        <div className='recommended-flex'>
          <Button onClickHandler={handleClick} value='' title='Featured' />
          <Button onClickHandler={handleClick} value='AI' title='AI' />
          <Button onClickHandler={handleClick} value='Alphabets' title='Alphabets' />
          <Button onClickHandler={handleClick} value='Tech' title='Tech' />
          <Button onClickHandler={handleClick} value='Food' title='Food' />
          <Button onClickHandler={handleClick} value='Wedding' title='Wedding' />
        </div>
      </div>
    </>
  )
};

export default Recommended;
