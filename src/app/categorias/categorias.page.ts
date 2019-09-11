import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/domain/categoria.service';
import { CategoriaDTO } from '../models/categoria.dto';
import { API_CONFIG } from '../config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  itens: CategoriaDTO[];

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public categoriaService: CategoriaService,
    public navCtrl: NavController
  ) {
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.categoriaService.findAll()
    .subscribe(response => {
      this.itens = response;
    },
    error => {
      
    }
    )
  }

}
