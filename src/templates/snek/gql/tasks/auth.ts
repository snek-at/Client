import { User } from '../../../../session';
import { SnekSession } from '../../../../session/sessions';
import { IResponse } from './index';

interface IAuthResponse extends IResponse {
  data: {auth: AuthData};
  errors: [];
}

interface AuthData {
  token: string;
  refreshToken: string;
  user: {
    username: string;
  }
}

interface IRefreshResponse extends IResponse{
  data: {refresh: RefreshData}
}

interface RefreshData {
  payload: string;
  token: string;
  refreshToken: string;
}

interface IRevokeResponse extends IResponse{
  data: {revoke: RevokeData}
}

interface RevokeData {
  revoked: string;
}


/** @class A set of session aware Tasks */
export class SnekGqlAuthTasks {
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) { }

  /**
   * Anonymous login.
   *
   * @returns {Promise<IAuthResponse>} A JWT token.
   */
  async anon(): Promise<IAuthResponse> {
    let query = this.session.template.snekGql.mutations.jwtAuth.auth;
    let response = <IAuthResponse> await this.session.ep.send("mutation", query, { username: "cisco", password: "ciscocisco" });
    return response;
  }

  /**
   * User login.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<AuthData>} A JWT token,
   */
  async nonanon(user: User): Promise<IAuthResponse> {
    let query = this.session.template.snekGql.mutations.jwtAuth.auth;
    let response = <IAuthResponse>await this.session.ep.send("mutation", query, {
      username: user.username,
      password: user.password
    });

    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<IRefreshResponse>} A JWT token,
   */
  async refresh(): Promise<IRefreshResponse> {
    let query = this.session.template.snekGql.mutations.jwtAuth.refresh;
    let response = <IRefreshResponse>await this.session.ep.send("mutation", query, {
      refreshToken: this.session.refreshToken
    });


    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<IRevokeResponse>} Revoke acknowledgment.
   */
  async revoke(): Promise<IRevokeResponse> {
    let query = this.session.template.snekGql.mutations.jwtAuth.revoke;
    let response = <IRevokeResponse>await this.session.ep.send("mutation", query, {
      refreshToken: this.session.refreshToken
    });

    return response;
  }

  /**
   * Register a user
   */
}
