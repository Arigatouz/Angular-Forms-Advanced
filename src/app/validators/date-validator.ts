import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const promoStartAt: Date = form.get("promoStartAt").value;
    const promoEndAt: Date = form.get("promoEndAt").value;
    if (!promoStartAt || !promoEndAt) {
      return null;
    }
    const isRangeValid = promoEndAt?.getTime() - promoStartAt?.getTime() > 0;

    return isRangeValid ? null : { promoRangeError: true };
  };
}
