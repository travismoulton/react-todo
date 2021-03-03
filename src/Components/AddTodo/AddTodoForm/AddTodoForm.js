import React, { Component } from "react";

class AddTodoForm extends Component {
  state = {
    form: {
      todo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Todo",
        },
        value: "",
        validation: {
          required: true,
        },
      },
      date: {
        elementType: "input",
        elementConfig: {
          type: "date",
        },
        value: "",
        validation: {
          required: false,
        },
      },
      category: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "" },
            { value: "#addNewCategory", displayValue: "Add a new category" },
          ],
        },
      },
    },
  };

  render() {
    return (
      
    )
  }
}
