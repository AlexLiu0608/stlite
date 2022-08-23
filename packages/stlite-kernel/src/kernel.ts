// Ref: https://github.com/jupyterlite/jupyterlite/blob/f2ecc9cf7189cb19722bec2f0fc7ff5dfd233d47/packages/pyolite-kernel/src/kernel.ts

import { PromiseDelegate } from "@lumino/coreutils";

import { makeAbsoluteWheelURL } from "./url";

// Since v0.19.0, Pyodide raises an exception when importing not pure Python 3 wheels, whose path does not end with "py3-none-any.whl",
// so configuration on file-loader here is necessary so that the hash is not included in the bundled URL.
// About this change on Pyodide, see the links below:
// https://github.com/pyodide/pyodide/pull/1859
// https://pyodide.org/en/stable/project/changelog.html#micropip
import TORNADO_WHEEL from "!!file-loader?name=pypi/[name].[ext]&context=.!../py/tornado/dist/tornado-6.2-py3-none-any.whl"; // TODO: Extract the import statement to an auto-generated file like `_pypi.ts` in JupyterLite: https://github.com/jupyterlite/jupyterlite/blob/f2ecc9cf7189cb19722bec2f0fc7ff5dfd233d47/packages/pyolite-kernel/src/_pypi.ts
import PYARROW_WHEEL from "!!file-loader?name=pypi/[name].[ext]&context=.!../py/stlite-pyarrow/dist/stlite_pyarrow-0.1.0-py3-none-any.whl";
import STREAMLIT_WHEEL from "!!file-loader?name=pypi/[name].[ext]&context=.!../../../streamlit/lib/dist/streamlit-1.12.0-py2.py3-none-any.whl";

import Worker from "!!worker-loader?inline=no-fallback!./worker";

let httpCommId = 0;

export interface StliteKernelOptions {
  /**
   * The Streamlit subcommand to run.
   */
  command: "hello" | "run";

  /**
   * The file path on the Pyodide File System (Emscripten FS) to be set as a target of the `run` command.
   */
  entrypoint: string;

  /**
   * A list of package names to be install at the booting-up phase.
   */
  requirements: string[];

  /**
   * Files to mount.
   */
  files: Record<
    string,
    { data: string | ArrayBufferView; opts?: Record<string, any> }
  >;

  /**
   *
   */
  wheelBaseUrl?: string;
}

export class StliteKernel {
  private _isDisposed = false;

  private _worker: StliteWorker;

  private _loaded = new PromiseDelegate<void>();

  private _workerInitData: WorkerInitialData;

  constructor(options: StliteKernelOptions) {
    this._worker = new Worker();
    this._worker.onmessage = (e) => {
      this._processWorkerMessage(e.data);
    };

    console.debug("Custom wheel URLs:", {
      TORNADO_WHEEL,
      PYARROW_WHEEL,
      STREAMLIT_WHEEL,
    });
    const tornadoWheelUrl = makeAbsoluteWheelURL(
      TORNADO_WHEEL as unknown as string,
      options.wheelBaseUrl
    );
    const pyarrowWheelUrl = makeAbsoluteWheelURL(
      PYARROW_WHEEL as unknown as string,
      options.wheelBaseUrl
    );
    const streamlitWheelUrl = makeAbsoluteWheelURL(
      STREAMLIT_WHEEL as unknown as string,
      options.wheelBaseUrl
    );
    console.debug("Custom wheel resolved URLs:", {
      tornadoWheelUrl,
      pyarrowWheelUrl,
      streamlitWheelUrl,
    });
    this._workerInitData = {
      command: options.command,
      entrypoint: options.entrypoint,
      files: options.files,
      requirements: options.requirements,
      wheels: {
        tornado: tornadoWheelUrl,
        pyarrow: pyarrowWheelUrl,
        streamlit: streamlitWheelUrl,
      },
    };
  }

  get loaded(): Promise<void> {
    return this._loaded.promise;
  }

  public connectWebSocket(path: string): Promise<void> {
    this._worker.postMessage({
      type: "websocket:connect",
      data: {
        path,
      },
    });

    return Promise.resolve(); // TODO: Communicate the worker to confirm the connection
  }

  public sendWebSocketMessage(payload: Uint8Array) {
    this._worker.postMessage({
      type: "websocket:send",
      data: {
        payload,
      },
    });
  }

  private handleWebSocketMessage:
    | ((payload: Uint8Array | string) => void)
    | null = null;
  public onWebSocketMessage(handler: (payload: Uint8Array | string) => void) {
    this.handleWebSocketMessage = handler;
  }

  private httpRequestPromises: { [httpCommId: number]: PromiseDelegate<any> } =
    {};
  public sendHttpRequest(request: HttpRequest): Promise<HttpResponse> {
    httpCommId += 1;

    const executeDelegate = new PromiseDelegate<HttpResponse>();
    this.httpRequestPromises[httpCommId] = executeDelegate;

    this._worker.postMessage({
      type: "http:request",
      data: {
        httpCommId,
        request,
      },
    });

    return executeDelegate.promise;
  }

  public writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: Record<string, any>
  ): Promise<void> {
    return this._asyncPostMessage({
      type: "file:write",
      data: {
        path,
        data,
        opts,
      },
    });
  }

  public install(requirements: string[]): Promise<void> {
    return this._asyncPostMessage({
      type: "install",
      data: {
        requirements,
      },
    });
  }

  private _asyncPostMessage(message: InMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();

      channel.port1.onmessage = (e: MessageEvent<ReplyMessage>) => {
        channel.port1.close();
        const msg = e.data;
        if (msg.error) {
          reject(msg.error);
        } else {
          resolve();
        }
      };

      this._worker.postMessage(message, [channel.port2]);
    });
  }

  /**
   * Process a message coming from the pyodide web worker.
   *
   * @param msg The worker message to process.
   */
  private _processWorkerMessage(msg: OutMessage): void {
    switch (msg.type) {
      case "event:start": {
        this._worker.postMessage({
          type: "initData",
          data: this._workerInitData,
        });
        break;
      }
      case "event:loaded": {
        this._loaded.resolve();
        break;
      }
      case "websocket:message": {
        const { payload } = msg.data;
        this.handleWebSocketMessage && this.handleWebSocketMessage(payload);
        break;
      }
      case "http:response": {
        const { httpCommId, response } = msg.data;

        const executeDelegate = this.httpRequestPromises[httpCommId];
        delete this.httpRequestPromises[httpCommId];

        executeDelegate.resolve(response);
      }
    }
  }

  /**
   * Return whether the kernel is disposed.
   */
  get isDisposed(): boolean {
    return this._isDisposed;
  }

  /**
   * Dispose the kernel.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._worker.terminate();

    this._isDisposed = true;
  }
}
