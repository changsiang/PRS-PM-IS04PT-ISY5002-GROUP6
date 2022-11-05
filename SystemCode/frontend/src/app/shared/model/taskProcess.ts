export class TaskProcesses {
    "processes": Array<TaskProcess>;
}

export class TaskProcess {
    "associatedEntities": string;
    "serviceTasks": string;
    "processVariables": string;
    "reusableSubProcesses": string;
    "nodes": string;
    "timers": string;
    "tagsByVariable": string;
    "process-id": string;
    "process-name": string;
    "process-version": string;
    "package": string;
    "container-id": string;
    "dynamic": boolean;
}