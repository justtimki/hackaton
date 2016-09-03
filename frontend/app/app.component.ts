import { Component } from "@angular/core";
import { RegistrationFormComponent } from "./registration/registration.component"; 

@Component({
    selector: "app",
    templateUrl: "app/app.template.html",
    directives: [RegistrationFormComponent]
})

export class AppComponent {

}


