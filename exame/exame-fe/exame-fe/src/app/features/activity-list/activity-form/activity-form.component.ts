import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from '../../../core/models/activity.model';
import { ActivityService } from '../../../core/services/activity.service';
import { UtilsService } from '../../../core/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit {

  activityForm!: FormGroup;
  private activityCopy!: Activity;
  currentOwner!: number | null;
  showSaveDialog = false;
  showDeleteDialog = false;

  @Input("activity") activity!: Activity;
  @Output("reload") reload = new EventEmitter<boolean>(); 

  constructor(
    private fb: FormBuilder, 
    private activityService: ActivityService, 
    private utils : UtilsService
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      id: [null],
      ownerid: [null],
      description: ['', Validators.required],
      dtstart: ['', Validators.required],
      dtend: [''],
      enable: ['']
    });

    if(this.activity){
      this.currentOwner = this.activity.ownerid;
      this.activity.dtstart = this.activity.dtstart != null ? this.utils.formatDate(this.activity.dtstart, true) : null;
      this.activity.dtend = this.activity.dtend != null ? this.utils.formatDate(this.activity.dtend, true) : null;
      this.activityCopy = { ...this.activity };

      this.activityForm.patchValue({
        ...this.activity
      });
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activity = this.activityForm.value;
      this.openSaveConfirmation();
    } else {
      console.log('Form is invalid');
      this.activityForm.markAllAsTouched(); // Marca todos os campos como "tocados" para exibir as mensagens de erro
    }
  }

  save() {
    console.log("This.activity: ", this.activity)
    const _ac = { ...this.activity };

    _ac.owner = null;

    _ac.dtstart = this.activity.dtstart != null ? this.utils.formatDate(this.activity.dtstart, true) : null;
    _ac.dtend = this.activity.dtend != null ? this.utils.formatDate(this.activity.dtend, true) : null;

    if (_ac.id) {
      if (_ac.id !== 0) {
        console.log("Updating...");

        this.activityService.update(_ac).subscribe({
          next: () => {
            console.log('Update Ok');
            this.reload.emit(true);
          },
          error: (error) => {
            console.error('Error updating', error);
            alert('Error updating.');
          }
        });

      } else {
        console.log("Update without ID");
      }
    } else {
      console.log("Creating : ", _ac);

      this.activityService.save(_ac).subscribe({
        next: () => {
          console.log('Create Ok');
          this.reload.emit(true);
        },
        error: (error: any) => {
          console.error('Error creating', error);
          alert('Error');
        }
      });
    }   
  }

  deleteObject() {
    const _ac = { ...this.activity };
  
    if (_ac.id && _ac.id !== 0) {
      this.activityService.delete(_ac).subscribe({
        next: () => {
          this.activity = new Activity();
          this.activityCopy = new Activity();
          this.currentOwner = null;
          this.reload.emit(true);
        },
        error: (error: any) => {
          console.error('Error deleting', error);
          alert('Error deleting.');
        }
      });
  
    } else {
      console.warn("Attempted to delete with invalid ID:", _ac.id);
    }
  }
  
  resetForm(form: FormGroup): void {
    this.activity = { ...this.activityCopy };
    this.activityForm.reset(this.activity);
  }

  newObject(form: FormGroup): void {
    this.activity = new Activity();
    this.currentOwner = null;
    form.patchValue(this.activity);
  }

  onOwnerSelected(_idowner: number): void {
    this.currentOwner = _idowner;
    this.activityForm.patchValue({
      ...this.activity
    });
  }

  openSaveConfirmation() {
    this.showSaveDialog = true;
  }

  openDeleteConfirmation() {
    this.showDeleteDialog = true;
  }

  confirmSave() {
    this.showSaveDialog = false;
    this.save(); 
  }

  cancelSave() {
    this.showSaveDialog = false;
  }

  confirmDelete() {
    this.showDeleteDialog = false;
    this.deleteObject();
    this.currentOwner = null;
    this.activity = new Activity();
    this.activityForm.patchValue({
      ...this.activity
    });
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }
}
