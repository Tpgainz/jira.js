import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatusCategories {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all status categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategories<T = unknown>(callback?: never): Promise<T>;
  async getStatusCategories<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/statuscategory',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getStatusCategories' });
  }

  /**
   * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-2-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback: Callback<T>): Promise<void>;
  /**
   * Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-2-status-idOrName-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: never): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/statuscategory/${parameters.idOrKey}`,
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getStatusCategory' });
  }
}
