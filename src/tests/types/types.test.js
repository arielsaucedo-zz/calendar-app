import { types } from "../../types/types";

describe("Pruebas en archivo de tipos", () => {
  test("Debe de contener los tipos de acciones", () => {
    expect(types).toEqual({
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      eventSetActive: "[Event] Set Active",
      eventClearActive: "[Event] Clear event active",
      eventStartAddNew: "[Event] Start add new",
      eventAddNew: "[Event] Add New",
      eventClearActiveEvent: "[Event] Clear Active Event",
      eventUpdated: "[Event] Event Updated",
      eventDeleted: "[Event] Event Deleted",
      eventLoaded: "[Event] Events loaded",

      authChecking: "[Auth] Checking login state",
      authCheckingFinish: "[Auth] Finish checking login state",
      authStartLogin: "[Auth] Start login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start register",
      authStartTokenRenew: "[Auth] Start token renew",
      authLogout: "[Auth] Logout",
    });
  });
});
