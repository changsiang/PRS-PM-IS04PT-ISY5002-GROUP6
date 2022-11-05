export class NodeInstances {
    "node-instance": Array<NodeInstance>;

    public getFinalActionNode(){
        for (let n of this["node-instance"]) {
            if(n["node-completed"] == true && n["node-type"] == 'ActionNode') {
                return n;
            }
        }
        return null;
    }
}

export class NodeInstance {
    "node-instance-id": Number;
    "node-name": string;
    "process-instance-id": Number;
    "work-item-id": string;
    "container-id": string;
    "start-date": {
      "java.util.Date": Number;
    };
    "node-id": string;
    "node-type": string;
    "node-connection": string;
    "node-completed": boolean;
    "reference-id": string;
    "sla-compliance": Number;
    "sla-due-date": string;
}
