import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService) { }
    canActivate(): boolean {
        if (!this.auth.isLoggedIn()) {
            alert("请先登录！");
        }
        return this.auth.isLoggedIn();
    }
}
