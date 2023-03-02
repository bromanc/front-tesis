import {IProcess} from "./process.schema";

export interface IDegree {
    id: string;
    name: string;
    processes: IProcess[] | null;
}
