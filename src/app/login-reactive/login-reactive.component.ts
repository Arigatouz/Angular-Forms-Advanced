import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // email: FormControl = new FormControl("", {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: "blur",

  // });
  // password: FormControl = new FormControl("", {
  //   validators: [
  //     Validators.required,
  //     Validators.minLength(8),
  //     Validators.maxLength(16),
  //     createPasswordStrengthValidator(),
  //   ],
  // });

  // form: FormGroup = new FormGroup({
  //   email: this.email,
  //   password: this.password,
  // });

  form = this._formBuilder.group({
    email: [
      "",
      { validators: [Validators.required, Validators.email], updateOn: "blur" },
    ],
    password: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          createPasswordStrengthValidator(),
        ],
      },
    ],
  });

  constructor(private _formBuilder: NonNullableFormBuilder) {}

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
  ngOnInit() {}
  login() {
    const formValue = this.form.value;
  }
  reset() {
    this.form.reset();
    console.log(this.form.value);
  }
}
