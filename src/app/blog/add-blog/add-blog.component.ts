import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/helpers/common.service';
import { BlogService } from 'src/app/Shared/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;

  constructor(private fb: FormBuilder
    , private blogService: BlogService
    , private _commonservice: CommonService
    , private router: Router) { }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      thumbnailUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  getControl(controlName: string): AbstractControl | null {
    return this.blogForm.get(controlName);
  }

  get f() { return this.blogForm.controls; }

  onSubmit() {
    if (this.blogForm.valid) {
      const formValues = this.blogForm.value;

      const request = {
        ThumbnailUrl: formValues.thumbnailUrl,
        Title: formValues.title,
        Description: formValues.description,
        Content: formValues.content
      };

      this.blogService.add(request).subscribe(response => {
        if (response.success == true) {
          this._commonservice.ShowSuccess("Blog saved successfully");
          this.router.navigate(['/blog']);
        }
      });
    }
  }
}
