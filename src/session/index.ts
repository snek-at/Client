import { Endpoint } from '../endpoints';
import { cookieChecker, getCookie, setCookie, deleteCookie } from './cookie-utils';
import { IMainTemplate } from '../templates/index';

export interface UserData {
  firstName?: string;
  lastName?: string;
  ownedPages?: string;
  email?: string;
  dateJoined?: string;
  lastLogin?: string;
}

export interface IAuth {
  token: string;
  refreshToken: string;
}

export interface User {
  username: string;
  password: string;
}

export interface ISession {
  sessions: { [id: string]: ISession; };
  token: string | undefined;
  tokenName: string;

}

export class Session implements ISession {
  public sessions: { [id: string]: ISession; } = {};
  public token: string | undefined = "";

  public tokenName: string = "token";

  /**
   * Creates an instance of a Session.
   *
   * @constructor
   * @author: schettn
   * @param {string} ep A endpoint
   * @param {string} template A template set
   */
  constructor(private sId: string, public ep: Endpoint, public template: IMainTemplate) { }

  /**
   * Add subsession.
   * 
   * @param childSId The session name of the child.
   * @param permanent True if not set.
   */
  addSubSession(childSId: string, type: any = Session) {
    let session: ISession;
    session = new type(this.sId + "_" + childSId, this.ep, this.template);

    this.sessions[childSId] = session;
  }

  // initTasks(taskclass: SnekGqlNpSessionTasks){
  //   // init ne task
  // }

  /**
  * Is alive check.
  * 
  * @description Token status check.
  * @param {boolean} alive A status whether the token is alive or not 
  */
  isAlive() {
    return cookieChecker(this.tokenName);
  }
}