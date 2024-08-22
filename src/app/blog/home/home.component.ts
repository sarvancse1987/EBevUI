import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/helpers/common.service';
import { BlogService } from 'src/app/Shared/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public blogs: any[] = [];

  constructor(public commonservice: CommonService
    , public blogService: BlogService
    , public router: Router
    , private _commonservice: CommonService
  ) {

  }

  ngOnInit() {
    this.onInitFormLoad();
  }

  onInitFormLoad() {
    this.blogService.getAll().subscribe(response => {
      this.blogs = response.result;
    });
  }

  getColClasses() {
    return {
      'col-lg-6': this.blogs.length >= 2,
      'col-lg-12': this.blogs.length < 2
    };
  }


  addNewBlog() {
    this.router.navigate(['/blog/add']);
  }

  deleteBlog(id: number): void {
    this.blogService.delete(id).subscribe((response) => {
      if (response.success == true)
        this.blogs = this.blogs.filter(blog => blog.id !== id);
      this._commonservice.ShowSuccess("Blog deleted successfully");
    }, error => {
      console.error('Error deleting blog:', error);
    });
  }

  ngOnDestroy(): void {
  }
}
