import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  empform!: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.empform = this.formBuilder.group({
      employees: this.formBuilder.array([])
    })
  }


  employees(): FormArray {
    return this.empform.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.formBuilder.group({
      firstName: '',
      LastName: '',
      experience: this.formBuilder.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeExperience(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('experience') as FormArray;
  }

  newExperience(): FormGroup {
    return this.formBuilder.group({
      company: '',
      designation: ''
    })
  }

  addEmployeeExperience(empIndex: number) {
    this.employeeExperience(empIndex).push(this.newExperience())
  }

  removeEmployeeExperience(empIndex: number, expIndex: number) {
    this.employeeExperience(empIndex).removeAt(expIndex);
  }

  onSubmit() {
    console.log(this.empform.value)
  }

  // addNewExperience(): void {
  //   const add = this.form.get('experience') as FormArray;
  //   add.push(this.formBuilder.group({
  //     company: [],
  //     designation: []
  //   }))
  // }

  // deleteExperienceGroup(index: number): void {
  //   const add = this.form.get('experience') as FormArray;
  //   add.removeAt(index);
  // }

  // get experienceGroup () {
  //   return this.form.get('experience') as FormArray
  // }
}
