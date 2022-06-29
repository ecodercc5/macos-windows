export interface IMacOSWindows {
  [id: string]: IMacOSWindow;
}

export interface IMacOSWindow {
  id: string;
  appId: string;
  // position: { x: number; y: number };
  // dimensions: { width: number; height: number };
  mode: "minimized" | "maximized" | "exact";
}

interface ICreateMacOSWindowArgs {
  appId: string;
  // position: { x: number; y: number };
  // dimensions: { width: number; height: number };
}

export namespace MacOSWindows {}

export namespace MacOSWindow {
  export const create = (args: ICreateMacOSWindowArgs): IMacOSWindow => {
    const id = Math.random().toString();
    const appId = args.appId;
    const mode = "exact";

    return { id, appId, mode };
  };
}
