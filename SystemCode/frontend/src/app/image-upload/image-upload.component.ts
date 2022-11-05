import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';
import { BackendService } from '../shared/service/backend/backend.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass']
})

export class ImageUploadComponent implements OnInit {
  rtPreviewImage = ''
  ltPreviewImage = ''
  analysing = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
  }

  rtOnChange(event: any): void {
    const file: File = event.target.files[0];
    const type: String = file.type;
    if (type !== "image/jpeg") {
      console.error("Invalid File Type")
    }
    this.fileReader(file, 'rt');
  }

  ltOnChange(event: any): void {
    const file: File = event.target.files[0];
    const type: String = file.type;
    if (type !== "image/jpeg") {
      console.error("Invalid File Type")
    }
    this.fileReader(file, 'lt');
  }

  fileReader(file: File, src: String): void {
    const reader = new FileReader();
    let result = '';
    reader.onload = (evt : any) => {
      if (src === 'rt') {
        console.log(evt)
        this.rtPreviewImage = evt.target.result
      } else if (src === 'lt') {
        this.ltPreviewImage = evt.target.result
      }
    }
    reader.readAsDataURL(file)
  }

  async analysis() {
    if (this.rtPreviewImage !== '' && this.ltPreviewImage !== '') {
      this.analysing = true;
      const rtAnnotate = await firstValueFrom(this.backendService.getAnnotations(this.rtPreviewImage));
      const ltAnnotate = await firstValueFrom(this.backendService.getAnnotations(this.ltPreviewImage));
      const rtLabels = await firstValueFrom(this.backendService.getPredictions(this.rtPreviewImage));
      const ltLabels = await firstValueFrom(this.backendService.getPredictions(this.ltPreviewImage));
      this.backendService.setRtAnnotateImg(rtAnnotate["annotate"]);
      this.backendService.setLtAnnotateImg(ltAnnotate["annotate"]);
      this.backendService.setRtLabels(rtLabels);
      this.backendService.setLtLabels(ltLabels);
      this.router.navigate(['/result'], { relativeTo: this.route});
    } else {
      console.log('do not proceed')
    }
  }
}
