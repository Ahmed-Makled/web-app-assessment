import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[inputMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputMaskDirective,
      multi: true
    }
  ]
})
export class InputMaskDirective implements ControlValueAccessor, OnChanges {
  @Input('inputMask') inputMask: string;
  oldValue: string = '';
  regExpr: RegExp;

  constructor(private el: ElementRef<HTMLInputElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputMask']) {
      this.regExpr = new RegExp(this.inputMask);
    }
  }

  writeValue(value: any) {
    this.el.nativeElement.value = value;
    this.oldValue = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  onInput() {
    const inputEl = this.el.nativeElement;
    const value = inputEl.value;
    let pos = inputEl.selectionStart;
    const noMatch: boolean = value && !this.regExpr.test(value);

    if (noMatch) {
      inputEl.selectionStart = inputEl.selectionEnd = pos - 1;
      if (inputEl.value.length < this.oldValue.length && pos === 0) {
        pos = 2;
      }
      inputEl.value = this.oldValue;
      inputEl.selectionStart = inputEl.selectionEnd = pos - 1;
    } else {
      this.oldValue = value;
      this.onChange(value);
    }
  }
}
