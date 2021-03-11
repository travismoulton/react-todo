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
          reference: true,
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
          reference: false,
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
          reference: false,
          value: this.props.categoryValue,
          changed: this.props.categoryOnChange,
        },
      },
      show: false,
      fetchCategories: true,
    };
  }

  componentDidMount() {
    this.getCategoryOptions();
  }

  setProperFocus = () => {
    if (this.props.show && this.state.form.todo.reference) {
      this.setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          todo: {
            ...prevState.form.todo,
            reference: false,
          },
        },
      }));
    }
    if (
      !this.props.show &&
      !this.state.form.todo.reference &&
      !this.state.form.todo.value
    ) {
      this.setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          todo: {
            ...prevState.form.todo,
            reference: true,
          },
        },
      }));
    }

    if (this.state.form.todo.value && this.state.form.todo.reference) {
      this.setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          todo: {
            ...prevState.form.todo,
            reference: false,
          },
        },
      }));
    }
  };

  componentDidUpdate() {
    if (this.props.todoValue !== this.state.form.todo.value)
      this.updateFormState("todo");

    if (this.props.dateValue !== this.state.form.date.value)
      this.updateFormState("date");

    if (this.props.categoryValue !== this.state.form.category.value)
      this.updateFormState("category");

    if (this.state.fetchCategories) this.getCategoryOptions();

    this.setProperFocus();
  }

  updateFormState = (formEl) => {
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

  getCategoryOptions = async () => {
    const newOptions = [
      { value: "", displayValue: "" },
      { value: "#addNewCategory", displayValue: "Add a new category" },
    ];

    await fetch(
      "https://todos-30510-default-rtdb.firebaseio.com/categories.json",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        for (const key in data) {
          newOptions.push({
            value: data[key].categoryValue,
            displayValue: data[key].displayValue,
          });
        }
      });

    this.setState((prevState) => ({
      ...prevState,
      fetchCategories: false,
      form: {
        ...prevState.form,
        category: {
          ...prevState.form.category,
          elementConfig: {
            ...prevState.form.category.elementConfig,
            options: newOptions,
          },
        },
      },
    }));
  };

  triggerFetchCategories = () => {
    this.setState((prevState) => ({
      ...prevState,
      fetchCategories: true,
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
              reference={el.config.reference}
            />
          );
        })}
      </form>
    );

    let backdrop = null;

    if (this.props.show)
      backdrop = (
        <>
          <Backdrop clicked={this.props.closeBackdropAndResetCategory} />
          <Modal>
            <AddCategory
              backdropHandler={this.props.closeBackdropAndResetCategory}
              triggerFetchCategories={this.triggerFetchCategories}
            />
          </Modal>
        </>
      );

    return (
      <Fragment>
        {backdrop}
        {form}
      </Fragment>
    );
  }
}

export default AddTodoForm;
