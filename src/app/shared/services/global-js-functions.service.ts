import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalJsFunctionsService {
  private renderer: Renderer2;
  // run 'RendererFactory2' to get 'Renderer2' instance inside @Injectable() service.
  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Function to Toggle Password Visibility
  togglePasswordVisibility(el) {
    if (el.target.nextSibling.getAttribute('type') === 'password') {
      this.renderer.removeClass(el.target, 'fa-eye');
      this.renderer.addClass(el.target, 'fa-eye-slash');

      this.renderer.setAttribute(el.target.nextSibling, 'type', 'text');
    } else {
      this.renderer.removeClass(el.target, 'fa-eye-slash');
      this.renderer.addClass(el.target, 'fa-eye');

      this.renderer.setAttribute(el.target.nextSibling, 'type', 'password');
    }
  }

  // capitalize first letter of each word
  toTitleCase(phrase: string) {
    return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // convert size in bytes to KB, MB, GB
  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) { return '0 Bytes'; }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  // get exif orientation value for the uploaded image
  getExifOrientation(file: File, callback: (n: number) => any) {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {

      if (!event.target) {
        return;
      }

      const fileReader = event.target as FileReader;
      const view = new DataView(fileReader.result as ArrayBuffer);

      if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2);
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) { return callback(-1); }

        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return callback(-1);
          }

          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);

          const tags = view.getUint16(offset, little);
          offset += 2;

          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }

        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }

      return callback(-1);
    };

    reader.readAsArrayBuffer(file);
  }

  // get date in nice format (return today's date by default)
  getFormattedDate(date: Date = new Date()) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    const getFormattedDate = `${dd}/${mm}/${yyyy}`;
    return getFormattedDate;
  }

  // calculate the number of days between two dates
  calcDaysBetweenDates(
    oldDate: { day: number, month: number, year: number },
    newDate: { day: number, month: number, year: number }
  ) {
    const firstDate = new Date(oldDate.year, oldDate.month, oldDate.day);
    const secondDate = new Date(newDate.year, newDate.month, newDate.day);
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.round(((firstDate as any) - (secondDate as any)) / oneDay);
  }

  // get time in specific timezone
  getTimeInSpecificTimezone(timeZone: string, niceFormat?: boolean) {
    const targetTime = new Date().toLocaleString('en-US', { timeZone });
    return niceFormat ? this.getFormattedDate(new Date(targetTime)) : new Date(targetTime);
  }

  // masking some characters from the string
  stringMask(value: string, unMaskedCharsCount: number) {
    const regexPattern = new RegExp('.(?=.{' + unMaskedCharsCount + '})', 'g');
    const output = value.replace(regexPattern, '*');

    return output;
  }

}
