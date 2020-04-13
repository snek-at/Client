import { SnekSession } from '../../../../session/sessions';
import { ISnekGqlTemplate } from '../index';

interface IGitlabServerResponse {
  data: { page: GitlabServerData }
}

interface GitlabServerData {
  supportedGitlabs: []
}

interface IAllPageUrlResponse {
  data: { pages: [] }
}

/** @class A set of session aware Tasks */
export class SnekGqlGeneralTasks {
  public template: ISnekGqlTemplate;
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) {
    this.template = session.template.snekGql;
  }

  /**
   * Gitlab Server
   *
   * @returns {Promise<IGitlabServerResponse>} A list of Gitlab server.
   */
  async gitlabServer(): Promise<IGitlabServerResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.general.gitlabServer;
    let response = <IGitlabServerResponse>await this.session.ep.send("query", query, { token: this.session.token });

    return response;
  }

  /**
   * All page url
   * 
   * @returns {Promise<IAllPageUrlResponse>} A list of all page urls.
   */
  async allPageUrls(): Promise<IAllPageUrlResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.general.allPageUrls;
    let response = <IAllPageUrlResponse>await this.session.ep.send("query", query, { token: this.session.token });

    return response;
  }
}