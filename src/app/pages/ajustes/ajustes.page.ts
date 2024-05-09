import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private router: Router,private navCtrl: NavController) {}

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  goBack() {
    this.navCtrl.back();
  }

}
