import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { TaskSummary } from '../model/taskInstance';
import { TaskProcess } from '../model/taskProcess';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private taskProcesses : Array<TaskProcess> = [];
  public currentPatient : Patient = new Patient();
  public currentTask : TaskSummary = new TaskSummary();
  private selectedSymptoms: Array<string> = [];
  private finalDiagnosis: string = '';
  private possibleDiagnosis: Array<{[index: string]: any}> = [];

  constructor() { }

  getSelectedSymptoms() {
    return this.selectedSymptoms;
  }

  setSelectedSymptoms(selectedSymptoms: Array<string>){
    this.selectedSymptoms = selectedSymptoms;
  }

  setCurrentPatient(patient: Patient) {
    this.currentPatient = patient;
  }

  setTaskProcesses(taskProcesses : Array<TaskProcess>) {
    this.taskProcesses = taskProcesses;
  }

  setCurrentTask(taskSummary : TaskSummary) {
    this.currentTask = taskSummary;
  }

  setfinalDiagnoosis(finalDiagnosis: string) {
    this.finalDiagnosis = finalDiagnosis;
  }

  getfinalDiagnosis(): string {
    return this.finalDiagnosis;
  }

  setPossibleDiagnosis(possibleDiagnosis: any[]) {
    this.possibleDiagnosis = possibleDiagnosis;
  }

  getPossibleDiagnosis():Array<{[index: string]: any}>{
    return this.possibleDiagnosis;
  }

  getEyePainProcess() {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'EyePain';
    });
  };

  getEyeRednessProcess () {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'EyeRed';
    })
  }
  
  getFloatersProcess() {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'Floater';
    })
  }

  getBlurredVisionProcess() {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'BlurredVision';
    })
  }

  getDoubleVisionProcess() {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'DoubleVision';
    })
  }

  getEyeRednessAndPainProcess() {
    return this.taskProcesses.find((task) => {
      return task['process-name'] === 'RednessAndPain';
    })
  }
}
