// register.component.ts

import { Component } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    formData = {
        username: '',
        email: '',
        password: ''
    };

    onSubmit() {
        // Handle form submission here
        console.log('Form submitted:', this.formData);
    }
}
