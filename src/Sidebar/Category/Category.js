// import "./Category.css";
import Input from "../../components/search/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Icons"
          title="Icons"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Animals"
          title="Animals"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Digital"
          title="Digital"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Social Media"
          title="Social Media"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
