import { Injectable } from '@angular/core';

interface Diagnosis {
  diagnosis: string,
  signs: Array<string>
}

@Injectable({
  providedIn: 'root'
})

export class RuleEngineService {
  private diagnosis = [
    this.createDiagnosisItem('mild non-proliferative diabetic retinopathy', ['microaneurysm']),
    this.createDiagnosisItem('moderate non-proliferative retinopathy', ['blot hemorrhage']),
    this.createDiagnosisItem('moderate non-proliferative retinopathy', ['dot hemorrhage']),
    this.createDiagnosisItem('moderate non-proliferative retinopathy', ['hard exudate']),
    this.createDiagnosisItem('Age-related macular degeneration', ['drusen']),
  ];

  constructor() { }

  createDiagnosisItem(diagnosis: string, signs: Array<string>): Diagnosis{
    return {diagnosis: diagnosis, signs: signs};
  }

  infer(detectedSigns: Array<string>, direction: string): string {
    const detectedSignsUnique = [... new Set(detectedSigns)];
    let possibleDiagnosis: Array<any> = this.diagnosis.filter(d => {
      let intersect = this.findIntersect(detectedSignsUnique, d.signs);
      return (intersect.length === detectedSignsUnique.length || intersect.length === d.signs.length);
    });
    const hasOpticCup = detectedSignsUnique.find(x => x === 'optic cup') != undefined;
    const hasFovea = detectedSignsUnique.find(x => x === 'fovea') != undefined;
    if ((possibleDiagnosis.length === 0 && hasOpticCup && hasFovea)) {
      possibleDiagnosis = ['normal'];
    } else {
      possibleDiagnosis = this.deconstruct(possibleDiagnosis);
      detectedSignsUnique.splice(detectedSignsUnique.indexOf('optic cup'), 1)
      detectedSignsUnique.splice(detectedSignsUnique.indexOf('fovea'), 1)

    };

    const diagnosisText = this.geneateTextOutput(possibleDiagnosis, detectedSignsUnique, direction)
    return diagnosisText;
  }

  private findIntersect(array1: Array<string>, array2: Array<string>): Array<string> {
    let intersect: Array<string> = array1.filter(s => {
      return array2.includes(s);
    });
    return intersect;
  }

  private deconstruct(possibleDiagnosis: any): string[] {
    let output = []
    for (let pd of possibleDiagnosis) {
      output.push(pd['diagnosis']);
    }
    return output;
  }

  private geneateTextOutput(diagnosis: string[], signs: string[], direction: string): string {
        let res: string = `No feature detected on ${direction} fundus. Unable to make diagnosis inference.`;
        if (diagnosis.length === 1 && diagnosis[0] === 'normal') {
          res = `Predicted to be normal in ${direction} eye`;
        } else if (diagnosis.length >= 1) {
          res = `Suspected ${diagnosis.toString().replace(",", " and ")}, due to ${signs.toString().replace(",", " and ")} found in ${direction} eye.`
        };
        return res;
  }
}
