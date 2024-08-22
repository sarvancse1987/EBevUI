import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/helpers/common.service';
import { BlogService } from 'src/app/Shared/services/blog.service';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  public blogs: any[] = [];

  constructor(public commonservice: CommonService
    , public blogService: BlogService
    , public routes: Router
  ) {

  }

  ngOnInit() {
    this.onInitFormLoad();
  }

  onInitFormLoad() {
    this.blogService.getAll().subscribe(response => {
      this.blogs = response;
    });
  }

  ngOnDestroy(): void {
  }
}
