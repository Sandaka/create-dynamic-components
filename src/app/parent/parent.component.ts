import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR!: ViewContainerRef;

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ChildComponent>>();

  constructor(private CFR: ComponentFactoryResolver) {}
  
  ngOnInit(): void {
    
  }


  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(ChildComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  
  remove(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      (x) => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.VCR.indexOf(componentRef as any);

    console.log(componentRef + '-----' + vcrIndex+1);

    // removing component from container
    this.VCR.remove(vcrIndex+1);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );

    console.log('new size: ' + this.componentsReferences.length);
  }

}
