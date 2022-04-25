import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  public unique_key!: number;
  public parentRef!: ParentComponent;

  constructor() { }

  ngOnInit(): void {
  }

  remove_me() {
    console.log(this.unique_key)
    this.parentRef.remove(this.unique_key)
  }

}
