import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { startEventDelete } from "../../../actions/events";

jest.mock("../../../actions/events", () => ({
  startEventDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Pruebas en componente <DeleteEventFab />", () => {
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de llamar el eventStartDelete al hacer click ", () => {
    wrapper.find("button").prop("onClick")();

    expect(startEventDelete).toHaveBeenCalled();
  });
});
