import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { AppRouter } from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    checking: true,
  },
};
const store = mockStore(initialState);
// store.dispatch = jest.fn();

describe("Pruebas sobre componente <AppRouter />", () => {
  test("Debe de mostrarse correctamente", () => {
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de mostrar la ruta publica", () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("Debe de mostrar la ruta privada", () => {
    const initialState = {
      auth: {
        checking: false,
        uid: "123",
        name: "Pepe",
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
