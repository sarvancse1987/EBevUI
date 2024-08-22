import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employeenavItems, navItems } from 'src/app/core-modules/dashboard/_nav';
import { UserType } from 'src/app/Shared/enums/UserRegister';
import { CommonService } from 'src/app/Shared/helpers/common.service';
import { AuthenticationService } from 'src/app/Shared/services/authentication.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  public navItems: any;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public username: string = '';
  public pathname: string = '';
  public pathicon: string = '';
  public innerWidth: any;
  constructor(public commonservice: CommonService
    , public auth: AuthenticationService
    , public routes: Router
    , @Inject(DOCUMENT) _document?: any
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });

    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.commonservice.getUserInformation();
    // if (this.commonservice.userrole == UserType.Admin) {
    //   this.navItems = navItems;
    // }
    // else {
    //   this.navItems = employeenavItems;
    // }
    this.navItems = navItems;

    this.innerWidth = window.innerWidth;

    let urlpath: string = routes.url;
    let urlname: string = "";
    urlname = String(routes.url.split('/').pop());
    this.pathname = urlname;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.auth.logOut();
  }

}
