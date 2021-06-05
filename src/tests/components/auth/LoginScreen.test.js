import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import Swal from "sweetalert2";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Pruebas en component <LoginScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar al dispatch del login", () => {
    wrapper.find(`input[name="lEmail"]`).simulate("change", {
      target: {
        name: "lEmail",
        value: "test@test.com",
      },
    });

    wrapper.find(`input[name="lPassword"]`).simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith("test@test.com", "123456");
  });

  test("No hay registro si las contraseñas no son iguales", () => {
    wrapper.find(`input[name="rPassword1"]`).simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });

    wrapper.find(`input[name="rPassword2"]`).simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Error",
      text: "Las contraseñas deben de ser iguales",
    });
  });

  test("Registro con contraseñas iguales", () => {
    wrapper.find(`input[name="rPassword1"]`).simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });

    wrapper.find(`input[name="rPassword2"]`).simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith("", "", "123456");
  });
});
