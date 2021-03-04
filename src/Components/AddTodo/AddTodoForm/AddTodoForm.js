import React, { Component, Fragment } from "react";
import Input from "../../UI/Input/Input";

class AddTodoForm extends Component {
  state = {
    form: {
      todo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Todo",
        },
        value: this.props.todoValue,
        changed: this.props.todoOnChange,
        validation: {
          required: true,
        },
      },
      // date: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "date",
      //   },
      //   value: "",
      //   validation: {
      //     required: false,
      //   },
      // },
      // category: {
      //   elementType: "select",
      //   elementConfig: {
      //     options: [
      //       { value: "", displayValue: "" },
      //       { value: "#addNewCategory", displayValue: "Add a new category" },
      //     ],
      //   },
      // },
    },
  };

  render() {
    console.log(this.props.todoValue);
    const formArr = [];
    for (const key in this.state.form) {
      formArr.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form>
        {formArr.map((el) => {
          console.log(el.config.value);
          return (
            <Input
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={el.config.changed}
              key={el.id}
            />
          );
        })}
      </form>
    );

    return <Fragment>{form}</Fragment>;
  }
}

export default AddTodoForm;
