//#region > Imports
//> SNEK Templates
import SnekTemplate from "./snek";
//#endregion

//#region > Interfaces
/** @interface IMainTemplate defines the structure of the base templates */
interface IMainTemplate {
  snek: SnekTemplate;
}
//#endregion

//#region > Classes
/** @class A Template which initializes all SubTemplates */
class MainTemplate implements IMainTemplate {
  public snek = new SnekTemplate();
}
//#endregion

//#region > Exports
export type { IMainTemplate };
export { MainTemplate };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
