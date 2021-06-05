import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

const initialState = {
  modalOpen: false,
};

describe("Pruebas en el uiReducer.js", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = uiReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Debe de abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    let state = uiReducer(initialState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    state = uiReducer(initialState, modalClose);

    expect(state).toEqual({ modalOpen: false });
  });
});
