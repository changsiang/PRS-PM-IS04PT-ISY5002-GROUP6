import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../shared/model/patient';
import { BackendService } from '../shared/service/backend/backend.service';
import { RuleEngineService } from '../shared/service/rule-engine.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  public objectKeys = Object.keys;
  public window = window;
  public currentDateTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  public currentPatient: Patient = new Patient();
  public currentSymptoms = "";
  rtAnnotate = ''
  ltAnnotate = ''
  rtLabels = []
  ltLabels = []
  ltDiagnosisText = '';
  rtDiagnosisText = '';

  public possibleDiagnosis: Array<{[index: string]: any}> = [];
  constructor(
    private backendService: BackendService,
    private ruleEngineSerivce: RuleEngineService,
    private router: Router, 
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.rtAnnotate = this.backendService.getRtAnnotateImg();
    this.ltAnnotate = this.backendService.getLtAnnotateImg();
    this.rtLabels = this.backendService.getRtLabels();
    this.ltLabels = this.backendService.getLtLabels();
    this.ltDiagnosisText = this.ruleEngineSerivce.infer(this.classLabelsOnly(this.ltLabels), "left");
    this.rtDiagnosisText = this.ruleEngineSerivce.infer(this.classLabelsOnly(this.rtLabels), "right");
  }

  classLabelsOnly(labels: any): any {
    let classes = []
    for(let label of labels) {
      classes.push(label["label"])
    }
    return classes;
  }

  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  dynamicDownloadJson() {
    const json = {
      rightEye: this.rtLabels,
      leftEye: this.ltLabels
    };

      this.dyanmicDownloadByHtmlTag({
        fileName: 'report.json',
        text: JSON.stringify(json)
      });
  }

  nextPatient() {
    this.router.navigate(['/image-upload'], { relativeTo: this.route});
  }
}
