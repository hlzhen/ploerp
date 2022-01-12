import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { PloUtilsService } from "../plo-service/plo-utils.service";

@Injectable()
export class routerGuard implements CanActivate {

    constructor(private utils: PloUtilsService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('guard loading: ' + state.url)
        const links: any[] = JSON.parse(this.utils.getRunTimeCache('ROUTER-ALL'));
        for (let i = 0; i < links.length; i++) {
            const item = links[i];
            if ('/' + item.link === state.url) {
                return true;
            }
        }
        return this.router.createUrlTree(['/404']);
    }
}