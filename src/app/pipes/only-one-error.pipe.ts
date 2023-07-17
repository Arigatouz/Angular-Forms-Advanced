import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyOneError",
  // pure: true
  //the pure here means it means it will recompute it's output only when the input changes
  //if we set it to false, it will recompute it's output every time the change detection cycle runs
  // and by default, it's set to true
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: object, errorsPriority: string[]): object | null {
    if (!allErrors || !errorsPriority) {
      return null;
    }

    const onlyOneError: object = {};

    for (let error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }

    return onlyOneError;
  }
}
