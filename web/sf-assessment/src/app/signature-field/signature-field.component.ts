import { Subject } from "rxjs";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { SignaturePad } from 'angular-signature-pad-v2';

@Component({
  selector: 'signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFieldComponent),
      multi: true,
    },
    {provide: MatFormFieldControl, useExisting: SignatureFieldComponent},
  ],
})
export class SignatureFieldComponent implements ControlValueAccessor, MatFormFieldControl<any>{
  title = 'signature-test';

  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;

  @Input()
  get value() {
    return this.signaturePad.toDataURL();
  }
  set value(input: string) {
    this.signaturePad?.fromDataURL(input);
    this.stateChanges.next();
  }

  sigPadOptions: Object = {
    minWidth: 1,
    maxWidth: 2.5,
    canvasHeight: 250,
    canvasWidth: 500,
    velocityFilterWeight: 0.7,
    backgroundColor: "rgb(255,255,255)"
  };

  ngAfterViewInit() {
    this.signaturePad.clear();
  }

  drawComplete() {
    this.value = this.signaturePad.toDataURL();
    this.onChange(this.value);
    this.stateChanges.next();
  }

  drawStart() {
    this.stateChanges.next();
    console.log('begin drawing');
  }

  // Required by MatFormFieldControl

  stateChanges = new Subject<void>();

  id = "";

  placeholder = "";

  ngControl = null;

  focused = true;

  get empty() {
    return this.signaturePad.toDataURL() === "";
  }

  shouldLabelFloat = true;

  required = false;

  disabled = false;

  errorState = false;

  controlType = "";

  setDescribedByIds(ids: string[]) {}

  onContainerClick(event: MouseEvent) {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  // required by ControlValueAccessor

  writeValue(value: string): void {
    this.value = value
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

}
