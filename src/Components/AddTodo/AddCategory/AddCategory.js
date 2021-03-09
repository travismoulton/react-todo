import { useState, useEffect } from "react";

import Input from "../../UI/Input/Input";
import useHttp from "../../../hooks/http";

const AddCategory = () => {
  const [categoryValue, setCategoryValue] = useState("");

  const updateCategoryValue = (e) => {
    setCategoryValue(e.target.value);
  };

  return (
    <Input
      elementType="input"
      elementConfig={{ type: "text", placeholder: "Category Title" }}
      value={categoryValue}
      changed={updateCategoryValue}
    />
  );
};

export default AddCategory;
