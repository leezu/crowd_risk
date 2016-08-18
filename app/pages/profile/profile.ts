import {Component} from '@angular/core';
import {AuthService} from '../../providers/auth-service/auth-service';
import {UserService} from '../../providers/user-service/user-service';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  private num_reports: number;
  private num_comments: number;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {}

  ionViewWillEnter() {
    this.userService.getNumberOfReports(this.auth.user.user_id)
      .subscribe((count) => {
        this.num_reports = count;
      });

    this.userService.getNumberOfComments(this.auth.user.user_id)
      .subscribe((count) => {
        this.num_comments = count;
      });
  }
}
