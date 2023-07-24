import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { HomeComponent } from "./home/home.component";
import { LoginReactiveComponent } from "./login-reactive/login-reactive.component";
import { courseResolver } from "./services/course.resolver";
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "courses/:id",
    component: CourseComponent,
    resolve: {
      course: courseResolver,
    },
  },
  {
    path: "add-new-course",
    component: CreateCourseComponent,
  },
  {
    path: "login",
    component: LoginReactiveComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
