import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "@testing-library/react";

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "ABC123",
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("Pruebas en componente <CalendarScreen />", () => {
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Pruebas con las interacciones del calendario", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop("onSelectEvent")({ start: "Hola" });
    expect(eventSetActive).toHaveBeenLastCalledWith({ start: "Hola" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
