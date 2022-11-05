export class TaskSummeries {
    "task-summary": Array<TaskSummary>;
}

export class TaskSummary {
    "task-id": Number;
    "task-name": string;
    "task-subject": string;
    "task-description": string;
    "task-status": string;
    "task-priority": Number;
    "task-is-skipable": boolean;
    "task-actual-owner": string;
    "task-created-by": string;
    "task-created-on": {
      "java.util.Date": Number;
    };
    "task-activation-time": {
      "java.util.Date": Number;
    };
    "task-expiration-time": string;
    "task-proc-inst-id": Number;
    "task-proc-def-id": string;
    "task-container-id": string;
    "task-parent-id": Number;
    "correlation-key": string;
    "process-type": Number;
}