import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { JwtHelperService  } from '@auth0/angular-jwt';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    jwtHelperService: JwtHelperService  = new JwtHelperService ();

    constructor(
        public http: HttpClient,
        public storage: StorageService
        //public cartService: CartService
        ) {
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email : this.jwtHelperService.decodeToken(tok).sub //faz pegar o email do token
        };
        this.storage.setLocalUser(user);
        //this.cartService.createOrClearCart();
    }

    
    logout() {
        this.storage.setLocalUser(null);
    }
}