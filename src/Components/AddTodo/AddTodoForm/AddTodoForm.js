import React, { Component, Fragment } from "react";

import Input from "../../UI/Input/Input";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import AddCategory from "../AddCategory/AddCategory";
import classes from "./AddTodoForm.module.css";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        date: {
          elementType: "input",
          elementConfig: {
            type: "date",
          },
          value: this.props.dateValue,
          changed: this.props.dateOnChange,
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
          value: this.props.categoryValue,
          changed: this.props.categoryOnChange,
        },
      },
    };
  }

  componentDidUpdate() {
    if (this.props.todoValue !== this.state.form.todo.value)
      this.updateState("todo");

    if (this.props.dateValue !== this.state.form.date.value)
      this.updateState("date");

    if (this.props.categoryValue !== this.state.form.category.value)
      this.updateState("category");
  }

  updateState = (formEl) => {
    let newValue;
    if (formEl === "todo") newValue = this.props.todoValue;
    if (formEl === "date") newValue = this.props.dateValue;
    if (formEl === "category") newValue = this.props.categoryValue;

    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [formEl]: {
          ...prevState.form[formEl],
          value: newValue,
        },
      },
    }));
  };

  render() {
    const formArr = [];
    for (const key in this.state.form) {
      formArr.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form className={classes.AddTodoForm}>
        {formArr.map((el) => {
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

    console.log("AddTodoForm.js", this.props.show);

    let backdrop = null;

    if (this.props.show)
      backdrop = (
        <>
          <Backdrop clicked={this.props.backdropHandler} />
          <Modal>
            <AddCategory />
          </Modal>
        </>
      );

    console.log(backdrop);

    return (
      <Fragment>
        {backdrop}
        {form}
      </Fragment>
    );
  }
}

export default AddTodoForm;
