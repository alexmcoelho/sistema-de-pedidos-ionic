import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciasDTO } from '../models/credencias.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds : CredenciasDTO = {
    email: "",
    senha: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController
  ) {}

  ionViewWillEnter() {
    this.menu.enable(false, "MenuApp");
  }
    
  ionViewDidLeave() {
    this.menu.enable(true, "MenuApp");
  }

  login(){
    console.log(this.creds);
    this.navCtrl.navigateRoot('/categorias');
  }

}
