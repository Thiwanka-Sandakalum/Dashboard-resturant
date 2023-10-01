import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  changePassword() {
    // Add your change password logic here
    if (this.newPassword === this.confirmPassword) {
      // Passwords match, you can submit the change password request to your server or perform any other action
      console.log('Password changed successfully');
    } else {
      // Passwords don't match, handle the error accordingly
      console.error('Passwords do not match');
    }
  }
}
