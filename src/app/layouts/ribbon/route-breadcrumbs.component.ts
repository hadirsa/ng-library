import {Component, OnInit} from '@angular/core';
import {NavigationMenuItem} from '../navigation';
import {JhiEventManager} from 'ng-jhipster';
import {APP_NAME} from '../../app.constants';

@Component({
    selector: 'sa-route-breadcrumbs',
    template: `
        <ol class='breadcrumb'>
           <li >{{appname}}</li>
           <li >{{activeNavigationMenuItem.topic}}</li>
        </ol>
  `,
    styles: []
})
export class RouteBreadcrumbsComponent implements OnInit {

    public items: Array<string> = [];
    public activeNavigationMenuItem = new NavigationMenuItem;
    public appname = APP_NAME;

    constructor(
        private eventManager: JhiEventManager) {
    }

    ngOnInit() {

        /*this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe(v => {
                this.items = [];
                this.extract(this.router.routerState.root);
            });*/

        this.eventManager.subscribe('activeNavigationMenu', (response) => {
            this.activeNavigationMenuItem = response.content.menuItem;
        });

    }

    extract(route) {
        let pageTitle = route.data.value['pageTitle'];
        if (pageTitle && this.items.indexOf(pageTitle) === -1) {
            this.items.push(route.data.value['pageTitle']);
        }
        if (route.children) {
            route.children.forEach(it => {
                this.extract(it);
            });
        }
    }


}
