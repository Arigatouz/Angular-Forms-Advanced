import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength";

@Directive({
  selector: "[passwordStrength]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    // we will use it as IFFY (Immediately Invoked Function Expression) to create a validator function
    // for template-driven forms
    return createPasswordStrengthValidator()(control);
  }
}
