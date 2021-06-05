import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import moment from "moment";

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  startEventUpdate,
} from "../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("../../../actions/events", () => ({
  startEventUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola mundo",
      notes: "Alguna nota",
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: "ABC123",
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Pruebas en componente <CalendarModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostrar el modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("Debe de llamar la accion de actualizar y cerrar el modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(startEventUpdate).toHaveBeenCalledWith(
      initialState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("Debe de mostrar error si falta el titulo", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find(`input[name="title"]`).hasClass("is-invalid")).toBe(
      true
    );
  });

  test("Debe de crear un nuevo evento", () => {
    const initialState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "ABC123",
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find(`input[name="title"]`).simulate("change", {
      target: {
        name: "title",
        value: "Hola Mundo",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenLastCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      notes: "",
      title: "Hola Mundo",
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("Debe de validar las fechas", () => {
    wrapper.find(`input[name="title"]`).simulate("change", {
      target: {
        name: "title",
        value: "Hola Mundo",
      },
    });

    const hoy = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
    });
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Error",
      text: "La fecha de finalizacion debe ser mayor que la fecha de inicio",
    });
  });
});
