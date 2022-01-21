import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public formGroup: FormGroup;
  public formControls: {
    name: FormControl,
    subject: FormControl,
    replyTo: FormControl,
    message: FormControl
  };

  public controlBounds: ControlConfig = {
    name: {
      minLength: 3,
      maxLength: 20
    },
    subject: {
      minLength: 5,
      maxLength: 50
    },
    message: {
      minLength: 5,
      maxLength: 100
    }
  };

  public formDataStatus: FormDataStatus = FormDataStatus.IDLE;

  constructor(private changeDetectorRef: ChangeDetectorRef, private http: HttpClient) {
    this.formControls = {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.name.minLength),
        Validators.maxLength(this.controlBounds.name.maxLength)
      ]),
      subject: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.subject.minLength),
        Validators.maxLength(this.controlBounds.subject.maxLength)
      ]),
      replyTo: new FormControl(null, [Validators.email]),
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.message.minLength),
        Validators.maxLength(this.controlBounds.message.maxLength)
      ]),
    };

    this.formGroup = new FormGroup(this.formControls);
  }

  ngOnInit(): void {
  }

  public getErrorMsg(control: FormControl, controlName: keyof ControlConfig): string {
    if (control.valid || control.pristine)
      return '';

    if (control.hasError('required'))
      return "This field is required";

    if (control.hasError('minlength'))
      return `Min length is ${this.controlBounds[controlName].minLength}`;

    if (control.hasError('maxlength'))
      return `Max length is ${this.controlBounds[controlName].maxLength}`;

    if (control.hasError('email'))
      return "Must be an email";

    console.log("I made a mistake. Requested form control error message for", control, "and controlName", controlName);
    return "I made a mistake while programming. Please report. Details are in console";
  }

  public onSubmit() {
    this.formDataStatus = FormDataStatus.SENDING;
    this.changeDetectorRef.markForCheck();

    try {
      if (this.formGroup.invalid) {
        this.formControls.name.markAsDirty();
        this.formControls.subject.markAsDirty();
        this.formControls.replyTo.markAsDirty();
        this.formControls.message.markAsDirty();
        this.formDataStatus = FormDataStatus.IDLE;
        return;
      }

      let body = new HttpParams().set("form-name", "contact");
      for (const [controlName, control] of Object.entries(this.formControls))
        body = body.set(controlName, control.value);

      const response = this.http.post("/", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: "text"
      }).toPromise();

      this.formDataStatus = FormDataStatus.SENT;
    } finally {
      // this.sendingData = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}

type ControlConfig = {
  name?: any,
  subject?: any,
  replyTo?: any,
  message?: any
};

enum FormDataStatus {
  IDLE = 'IDLE',
  SENT = 'SENT',
  SENDING = 'SENDING',
  ERROR = 'ERROR'
}
