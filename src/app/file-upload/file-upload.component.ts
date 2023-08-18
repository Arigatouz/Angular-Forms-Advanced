import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { Subscription, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    // The FileUploadComponent class implements the ControlValueAccessor interface.
    // this will allow us to use the FileUploadComponent as a form control.
    // and remove the error
    // ERROR Error: NG01203: No value accessor for form control name: 'thumbnail'. Find more at https://angular.io/errors/NG01203
    // we use useExisting to tell Angular to use the FileUploadComponent class as a form control.
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() requiredFileType: string;
  fileName = "";
  uploadProgress: number;
  uploadSub: Subscription;
  onChange = (fileName: string) => {};
  onTouched = () => {};
  onValidatorChange = () => {};
  disabled: boolean = false;
  fileUploadSuccess: boolean = false;
  fileUploadError: boolean = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    console.log(this.requiredFileType);
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      const upload$ = this.http
        .post("/api/thumbnail-upload", formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => (this.uploadProgress = null))
        );

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.type === HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
          this.onValidatorChange();
        }
      });
    }
  }

  // cancelUpload() {
  //   this.uploadSub.unsubscribe();
  //   this.reset();
  // }

  // reset() {
  //   this.uploadProgress = null;
  //   this.uploadSub = null;
  // }

  onClick(fileInput: HTMLInputElement) {
    this.onTouched();
    fileInput.click();
  }
  // The ControlValueAccessor interface requires us to implement the following methods:
  // writeValue
  // registerOnChange
  // registerOnTouched
  // setDisabledState
  // The writeValue method is used to set the value of the form control.
  // The registerOnChange method is used to register a callback that should be called when the value of the form control changes.
  // The registerOnTouched method is used to register a callback that should be called when the form control is touched.
  // The setDisabledState method is used to enable or disable the form control.
  writeValue(value: any): void {
    this.fileName = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }
  validate(control: AbstractControl<any, any>): ValidationErrors {
    if (this.fileUploadSuccess) return null;

    let errors: any = {
      requiredFileType: this.requiredFileType,
    };
    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }
    return errors;
  }
}
