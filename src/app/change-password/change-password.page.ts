import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AppRouteNames, LoadingMessages } from '../shared/shared/config-keys';
import { CustomValidationService } from '../services/custom-validation.service';
import { LoaderService } from '../shared/shared/loader.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form: FormGroup;
  submitted: boolean = false;


  constructor(private fb: FormBuilder, private navCtrl: NavController, private loading: LoaderService, private customValidator: CustomValidationService, private authService: AuthService) { }

  ngOnInit() {
    this.setupForm();
  }

  get controls() { return this.form.controls; }

  async update(passwords) {

    this.submitted = true;
    try {
      this.loading.start(LoadingMessages.Saving);
      var res = await this.authService.changePassword(passwords);
      if (res) {
        this.loading.stop();
        this.form.reset();
        this.navCtrl.navigateBack([AppRouteNames.Home])
      }
    } catch { this.loading.stop(); }

  }

  setupForm() {
    this.form = this.fb.group({
      username: null,
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },
      {
        validator: this.customValidator.MatchPassword('newPassword', 'confirmPassword'),
      });
  }

}
