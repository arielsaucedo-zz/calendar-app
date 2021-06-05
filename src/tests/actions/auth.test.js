import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";

import { startLogin, startRegister, startChecking } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Pruebas en las acciones de auth.js", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("startLogin funcionando correctamente", async () => {
    await store.dispatch(startLogin("test@test.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startLogin con error en login", async () => {
    await store.dispatch(startLogin("test1@test.com", "123456"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      text: "El usuario no existe",
      title: "Error",
    });

    await store.dispatch(startLogin("test@test.com", "1234567"));
    actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      text: "Password incorrecto",
      title: "Error",
    });
  });

  test("startRegister correcto", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "ABC",
        };
      },
    }));

    await store.dispatch(startRegister("Tests", "test-r@test.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "ABC",
        };
      },
    }));

    await store.dispatch(startChecking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
  });
});
