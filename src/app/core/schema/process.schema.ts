import {IAccountant} from "./accountant.schema";

export interface IProcess {
    id: string;
    name: string;
    version: string;
    subprocess: ISubprocess | null;
}

export interface ISubprocess {
    id: string;
    name: string;
    accountant: IAccountant;
    description: string;
    processId: string;
}
