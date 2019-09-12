import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: StorageService,
    public clienteService: ClienteService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(responde => {
        this.cliente = responde;
        this.getImageIfExists();
      },
      error => {});
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;

    },
    error => {
      //this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

}
