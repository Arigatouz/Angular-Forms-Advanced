import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CoursesService } from "../../services/courses.service";
import { courseTitleValidator } from "../../validators/async-course-title.validator";

interface CourseCategory {
  code: string;
  description: string;
}
@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.formBuilder.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        updateOn: "blur",
      },
    ],
    releaseDateAt: [new Date(), Validators.required],
    downloadAllowed: [false, Validators.requiredTrue],
    longDescription: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
      ],
    ],
    category: ["BEGINNER", Validators.required],
  });

  courseCategories$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
  ) {}
  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();
  }

  get courseTitle() {
    return this.form.controls.title;
  }
  get releasedDateAt() {
    return this.form.controls.releaseDateAt;
  }
}
