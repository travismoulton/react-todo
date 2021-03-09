import { useState, useEffect } from "react";

import Input from "../../UI/Input/Input";
import useHttp from "../../../hooks/http";

const AddCategory = (props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const { sendRequest } = useHttp();

  const addCategoryHandler = () => {
    sendRequest(
      "https://todos-30510-default-rtdb.firebaseio.com/categories.json",
      "POST",
      JSON.stringify({ categoryValue, displayValue: categoryValue }),
      false
    );
    props.backdropHandler();
  };

  return (
    <>
      <Input
        elementType="input"
        elementConfig={{ type: "text", placeholder: "Category Title" }}
        value={categoryValue}
        changed={(e) => setCategoryValue(e.target.value)}
      />
      <button onClick={addCategoryHandler}>Add Category</button>
    </>
  );
};

export default AddCategory;
