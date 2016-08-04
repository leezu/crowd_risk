import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  constructor(private auth: AuthService) {

  }

}
