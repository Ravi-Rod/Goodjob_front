import {Component, EventEmitter, Input, input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RemunerationVO} from "../../../model/Job-vo.model";

@Component({
  selector: 'app-remuneration-step',
  standalone: true,
  imports: [FormsModule, InputTextModule, FontAwesomeModule],
  templateUrl: './remuneration-step.component.html',
  styleUrl: './remuneration-step.component.scss'
})
export class RemunerationStepComponent {

  //remuneration = input.required<RemunerationVO>();


  @Input()
  remuneration!: RemunerationVO;

  @Output()
  remunerationChange = new EventEmitter<RemunerationVO>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  @ViewChild("formRemuneration")
  formRemuneration: NgForm | undefined;

  onRemunerationChange(newRemuneration: number) {
    this.remunerationChange.emit({value: newRemuneration});
    this.stepValidityChange.emit(this.validateForm());
  }

  private validateForm() {
    if (this.formRemuneration) {
      return this.formRemuneration?.valid!;
    } else {
      return false;
    }
  }
}
