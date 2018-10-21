import { FormControl, Validators, AbstractControl } from '@angular/forms';

export class CustomValidators extends Validators {

    /* Check if amount is valid */
    static checkAmount(control: FormControl) {

        if (control.value == '' || control.value.length == 0) {
            return null;
        }
        const value = control.value;
        const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

        if (!regex.test(value)) {
            // console.log("1. invalid format! Bad currency format.");
            return { invalid_format: true };
        }   
        
        if (value.length > 8) {
            // console.log("2. invalid format! Number more than 8 digits");
            return { invalid_format: true };
        }

        const twoDecimalPlaces = /\.\d{2}$/g;
        const oneDecimalPlace = /\.\d{1}$/g;

        if (value.match(twoDecimalPlaces) || value.match(oneDecimalPlace) || value.toString().indexOf('.') == -1) {
            return null;
        } else if (value[value.length-1] == '.') {
            // console.log("3. invalid format! decimal at the end.");
            return { invalid_format: true };
        } else {
            // console.log("4. invalid format!");
            return { invalid_format: true };
        }
    }

    /* Check postcode */
    static checkPostcode(control: FormControl) {

        const postcode = control.value;
        const digits   = (Math.log10((postcode ^ (postcode >> 31)) - (postcode >> 31)) | 0) + 1;

        if (postcode == '' || isNaN(postcode) || parseInt(postcode) < 0 || digits != 6) {
            return { invalid_postcode: true };
        }
        return null;
    }
}