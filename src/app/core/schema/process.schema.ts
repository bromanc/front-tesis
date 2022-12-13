interface IProcess {
    processId: string;
    processName: string;
    processVersion: string;
}
interface IDinoDetails {
    name: string;
    pronunciation: string;
    meaningOfName: string;
    diet: string;
    length: string;
    period: string;
    mya: string;
    info: string;
    favorite?: boolean;
}

export { IProcess, IDinoDetails };
