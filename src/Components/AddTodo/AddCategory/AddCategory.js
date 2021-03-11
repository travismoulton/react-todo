import { useState, useEffect, useRef } from "react";

import Input from "../../UI/Input/Input";
import useHttp from "../../../hooks/http";

const AddCategory = (props) => {
  const [categoryValue, setCategoryValue] = useState("");
  const { sendSyncRequest } = useHttp();
  const button = useRef(null);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") button.current.click();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKey);

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const addCategoryHandler = async () => {
    await sendSyncRequest(
      "https://todos-30510-default-rtdb.firebaseio.com/categories.json",
      "POST",
      JSON.stringify({ categoryValue, displayValue: categoryValue }),
      false
    );
    props.backdropHandler();
    props.triggerFetchCategories();
  };

  return (
    <>
      <Input
        elementType="input"
        elementConfig={{ type: "text", placeholder: "Category Title" }}
        value={categoryValue}
        changed={(e) => setCategoryValue(e.target.value)}
        reference={true}
      />
      <button onClick={addCategoryHandler} ref={button}>
        Add Category
      </button>
    </>
  );
};

export default AddCategory;
