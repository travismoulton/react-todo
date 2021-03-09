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
          ref: this.myRef,
        },
      },
      show: false,
      addNewCategory: false,
    };
  }

  componentDidMount() {
    // console.log("componentDidMount");
    this.getCategoryOptions();
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate");
    if (this.props.todoValue !== this.state.form.todo.value)
      this.updateFormState("todo");

    if (this.props.dateValue !== this.state.form.date.value)
      this.updateFormState("date");

    if (this.props.categoryValue !== this.state.form.category.value)
      this.updateFormState("category");

    this.getCategoryOptions();
  }

  updateFormState = (formEl) => {
    let newValue;
    if (formEl === "todo") newValue = this.props.todoValue;
    if (formEl === "date") newValue = this.props.dateValue;
    if (formEl === "category") {
      newValue = this.props.categoryValue;
    }

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
    let {
      form: {
        category: {
          elementConfig: { options },
        },
      },
    } = this.state;

    let newOptions = [];
    options.forEach((option) => {
      newOptions.push(option);
    });

    await fetch(
      "https://todos-30510-default-rtdb.firebaseio.com/categories.json",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Object.values(data).length + 2 !== options.length) {
          for (const key in data) {
            newOptions.push({
              value: data[key].categoryValue,
              displayValue: data[key].displayValue,
            });
          }
        }
      });

    if (options.length !== newOptions.length) {
      this.setState((prevState) => ({
        ...prevState,
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
    }
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

    let backdrop = null;

    if (this.props.show)
      backdrop = (
        <>
          <Backdrop clicked={this.props.backdropHandler} />
          <Modal>
            <AddCategory backdropHandler={this.props.backdropHandler} />
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

// updateShow = () => {
//   if (
//     this.state.form.category.value === "#addNewCategory" &&
//     !this.state.addNewCategory
//   ) {
//     this.setState((prevState) => ({
//       ...prevState,
//       show: true,
//       addNewCategory: true,
//     }));
//   }
// };

// closeBackdropOnClick = () => {
//   this.setState((prevState) => ({
//     ...prevState,
//     show: false,
//     addNewCategory: false,
//     form: {
//       ...prevState.form,
//       category: {
//         ...prevState.form.category,
//         value: "",
//       },
//     },
//   }));
// };
