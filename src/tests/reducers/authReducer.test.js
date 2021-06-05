import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: true,
  //   uid: null,
  //   name: null,
};

describe("Pruebas en authReducer.js", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Debe de loguear al usuario", () => {
    const action = {
      type: types.authLogin,
      payload: { uid: "ABC", name: "Pepe" },
    };

    const state = authReducer(initialState, action);

    // expect(state).toEqual({ checking: false, uid: "ABC", name: "Pepe" });
  });

  test("Debe de hacer el logout", () => {
    const initialState = {
      checking: true,
      uid: "ABC",
      name: "Pepe",
    };

    const action = {
      type: types.authLogout,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false });
  });
});
