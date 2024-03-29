import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public formControls: {
    name: UntypedFormControl,
    subject: UntypedFormControl,
    replyTo: UntypedFormControl,
    message: UntypedFormControl
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
      name: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.name.minLength),
        Validators.maxLength(this.controlBounds.name.maxLength)
      ]),
      subject: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.subject.minLength),
        Validators.maxLength(this.controlBounds.subject.maxLength)
      ]),
      replyTo: new UntypedFormControl(null, [Validators.email]),
      message: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(this.controlBounds.message.minLength),
        Validators.maxLength(this.controlBounds.message.maxLength)
      ]),
    };

    this.formGroup = new UntypedFormGroup(this.formControls);
  }

  ngOnInit(): void {
  }

  public getErrorMsg(control: UntypedFormControl, controlName: keyof ControlConfig): string {
    if (control.valid || control.pristine)
      return '';

    if (control.hasError('required'))
      return "This field is required";

    if (control.hasError('minlength'))
      return `Minimum length is ${this.controlBounds[controlName].minLength}`;

    if (control.hasError('maxlength'))
      return `Maximum length is ${this.controlBounds[controlName].maxLength}`;

    if (control.hasError('email'))
      return "Must be an email";

    console.log("I made a mistake. Requested form control error message for", control, "and controlName", controlName);
    return "I made a mistake while programming. Please report. Details are in console";
  }

  public async onSubmit() {
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
      for (let [controlName, control] of Object.entries(this.formControls)) {
        if (controlName === "replyTo")
          controlName = "reply-to";

        body = body.set(controlName, control.value);
      }

      if (environment.production) {
        const observable = this.http.post("/", body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          responseType: "text"
        });
        await firstValueFrom(observable);
      } else {
        await new Promise<void>(resolve => {
          setTimeout(() => {
            console.log("Not sending data on dev mode. Update the code if you want to really do so");
            resolve();
          }, 1_000);
        })
      }

      this.formDataStatus = FormDataStatus.SENT;
    } catch (e) {
      console.error("Error while sending form data", e);
      this.formDataStatus = FormDataStatus.ERROR;
    } finally {
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
