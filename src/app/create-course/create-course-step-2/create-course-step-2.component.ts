import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    priceType: ["premium", Validators.required],
    price: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(9999),
        Validators.pattern("[0-9]+"),
      ],
    ],
    promoStartAt: [null],
    promoEndAt: [null],
  });
  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      const priceControl = this.form.controls.price;
      if (value.priceType === "free" && priceControl.enabled) {
        priceControl.disable({ emitEvent: false });
        // The emitEvent: false option is used to prevent the valueChanges event from being emitted  in an infinite loop.
        // the subscription to the valueChanges event will be triggered when the price control is disabled or enabled.
      } else if (value.priceType === "premium" && priceControl.disabled) {
        priceControl.enable({ emitEvent: false });
      }
    });
  }
}
