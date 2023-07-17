import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  ngModelOptions: {} = {
    updateOn: "blur",
    // name:'email' // remember to remove the name attribute from the input element in the template when using this option
  };
  constructor() {}

  ngOnInit() {}
  login(loginForm: NgForm, $event: Event) {
    console.log(loginForm.value);
    console.log($event);
  }
  onChangeEmail(event) {
    console.log(event);
  }
}
