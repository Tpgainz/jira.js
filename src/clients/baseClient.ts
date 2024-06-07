import { exec } from "child_process";
import type { Callback } from "../callback";
import type { Client } from "./client";
import type { Config } from "../config";
import { getAuthenticationToken } from "../services/authenticationService";
import type { RequestConfig } from "../requestConfig";
import { HttpException } from "./httpException";

export class BaseClient implements Client {
  constructor(protected readonly config: Config) {
    try {
      new URL(config.host); // Ensure the host URL is valid
    } catch (e) {
      throw new Error(
        "Couldn't parse the host URL. Make sure it includes 'http://' or 'https://'."
      );
    }
  }

  /**
   * Executes a shell command and returns a promise that resolves with the command output.
   * @param cmd Command to be executed
   */
  private executeCommand(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`exec error: ${error.message}\n${stderr}`));
        } else {
          resolve(stdout);
        }
      });
    });
  }

  /**
   * Build and execute a curl command based on the request configuration.
   * @param requestConfig Configuration for the request
   */
  async sendRequest<T>(
    requestConfig: RequestConfig,
    callback: Callback<T> | never
  ): Promise<void | T> {
    const token = await getAuthenticationToken(this.config.authentication);
    const headers = `Authorization: Bearer ${token}`;
    const url = `${this.config.host}${requestConfig.path}`;

    // Build the curl command
    const curlCmd = `curl -X ${requestConfig.method} -H '${headers}' '${url}'`;

    try {
      const response = await this.executeCommand(curlCmd);
      return this.handleSuccessResponse(JSON.parse(response), callback);
    } catch (error) {
      return this.handleFailedResponse(error, callback);
    }
  }

  /**
   * Handles successful responses.
   */
  private handleSuccessResponse<T>(
    response: any,
    callback?: Callback<T> | never
  ): T | void {
    if (callback) {
      callback(null, response);
    } else {
      return response;
    }
  }

  /**
   * Handles failed responses and errors.
   */
  private handleFailedResponse<T>(
    error: Error,
    callback?: Callback<T> | never
  ): void {
    if (callback) {
      callback(error, null);
    } else {
      throw error;
    }
  }
}
