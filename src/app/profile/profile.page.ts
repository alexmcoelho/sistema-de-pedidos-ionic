import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: StorageService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.email = localUser.email;
    }
  }

}
