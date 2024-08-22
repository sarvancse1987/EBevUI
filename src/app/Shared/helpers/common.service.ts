import { Injectable, Inject } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2'
import { API_GATEWAY } from 'src/environments/environment';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isCustomer: boolean = false;
  userId: Number = 0;
  userType: number = 0;
  locationId: Number = 0;
  zoneId: Number = 0;
  userTypeId: Number = 0;
  isAdmin: boolean = false;
  servicepartnerid: number = 0;
  loggedinusername: string = '';
  isnew: boolean = false;
  isedit: boolean = false;
  isdelete: boolean = false;
  userrole: number = 0;
  constructor(private datePipe: DatePipe
    , private toastr: ToastrService
  ) {
    this.getUserInformation();
    this.isedit = true;
    this.isdelete = true;
    this.isnew = true;
  }

  getUserInformation() {
    let userinformation = localStorage.getItem('user_information');
    if (userinformation != null) {
      let userData = JSON.parse(userinformation);
      if (userData != null) {
        this.userId = userData.id;
        this.zoneId = userData.zoneId;
        this.locationId = userData.locationId;
        this.isCustomer = userData.isCustomer;
        this.userType = userData.userRole;
        this.userTypeId = userData.userTypeId;
        this.servicepartnerid = userData.employeeTypeId;
        this.loggedinusername = userData.employeeName;
        this.userrole = userData.userRole;
      }
    }
  }

  modalPopupConfig() {
    let config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg'
    };
    return config;
  }

  BindNgSelect(items: any): any {
    let returnArray = [];
    if (items != null && items != undefined && items.length > 0) {
      for (let data of items) {
        let dataObject = { "dataValueField": data.dataValueField, "dataTextField": data.dataTextField };
        returnArray.push(dataObject);
      }
    }
    return returnArray;
  }

  ShowSuccess(successMessage: string): void {
    //Swal.fire('success', '<b>' + successMessage + '</b>');
    this.toastr.success('', successMessage);
  }

  ShowError(errorMessage: string): void {
    //Swal.fire('error', '<b>' + errorMessage + '</b>');
    this.toastr.error('', errorMessage);
  }

  ShowWarning(successMessage: string): void {
    //Swal.fire('success', '<b>' + successMessage + '</b>');
    this.toastr.warning('', successMessage);
  }

  AskConfirmation(title: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    });
  }

  AskConfirmationCancelText(title: string, canceltext: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#D02127',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      cancelButtonText: canceltext
    });
  }

  transformDate(dateTime: any, format?: string): any {
    if (!format) {
      format = "dd/MM/yyyy";
    }
    let constDate = new Date();
    if (dateTime != null && dateTime != "") {
      if (typeof (dateTime) == "string") {
        //let parsed = moment(dateTime, 'MM/DD/YYYY').format();//Commented By sara
        let parsed = this.datePipe.transform(dateTime, "dd-MM-yyyy")
        dateTime = parsed;
      }
      constDate = new Date(dateTime);
    }
    let convertedDate: any = formatDate(constDate, format, 'en');
    return convertedDate;
  }

  transformstringDate(x: any) {
    let mdt = moment(x);
    return mdt.format("YYYY-MM-DDTHH:mm:ss").toString();
  }

  transformstringDateMin(x: any) {
    if (x != null && x != "") {
      let mdt = moment(x);
      return mdt.format("DD-MM-YYYY HH:mm").toString();
    }
    else {
      return "-----";
    }
  }

  transformstringExactDate(x: any) {
    let mdt = moment(x);
    return mdt.format("DD-MM-YYYY").toString();
  }

  transformstringExactSlashDate(x: any) {
    let mdt = moment(x);
    return mdt.format("DD/MM/YYYY").toString();
  }

  calculateDate(startDate: any, noofday: any) {
    const momStartDate = moment(startDate);
    let timeUnit: string = "days";
    let calculateddate = momStartDate.add(noofday, timeUnit as any).toDate();
    return calculateddate;
  }

  calculatePrevDate(startDate: any, noofday: any) {
    const momStartDate = moment(startDate);
    let timeUnit: string = "days";
    let calculateddate = momStartDate.subtract(noofday, timeUnit as any).toDate();
    return calculateddate;
  }

  transform(dateTime: any): any {
    let format = "dd-MM-yyyy";
    let constDate = new Date();
    if (dateTime != null && dateTime != "") {
      constDate = new Date(dateTime);
    }
    let convertedDate: any = formatDate(constDate, format, 'en');
    return convertedDate;
  }

  transformDateEmpty(dateTime: any): any {
    if (dateTime != null && dateTime != "") {
      let format = "dd-MM-yyyy";
      let constDate = new Date();
      if (dateTime != null && dateTime != "") {
        constDate = new Date(dateTime);
      }
      let convertedDate: any = formatDate(constDate, format, 'en');
      return convertedDate;
    }
    else {
      return "-----";
    }
  }

  dateFormat() {
    let valueFormat = {
      customTodayClass: 'custom-today-class',
      dateInputFormat: 'DD-MM-YYYY',
      showWeekNumbers: false
    }
    return valueFormat;
  }

  calculateYear(dt1: any, dt2: any) {
    var diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    return Math.abs(Math.round(diffYear / 365.25));
  }

  calculateMonth(dt1: any, dt2: any) {
    var diffMonth = (dt2.getTime() - dt1.getTime()) / 1000;
    diffMonth /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diffMonth));
  }

  dateDiff(startdate: any, enddate: any) {
    //define moments for the startdate and enddate
    var startdateMoment = moment(startdate);
    var enddateMoment = moment(enddate);

    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
      //getting the difference in years
      var years = enddateMoment.diff(startdateMoment, 'years');

      //moment returns the total months between the two dates, subtracting the years
      var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);

      //to calculate the days, first get the previous month and then subtract it
      startdateMoment.add(years, 'years').add(months, 'months');
      var days = enddateMoment.diff(startdateMoment, 'days')

      return {
        years: years,
        months: months,
        days: days
      };

    }
    else {
      return undefined;
    }
  }

  yearExpiryDate(startDate: any, years: any) {
    var day = Number(startDate.split('/')[0]);
    var month = Number(startDate.split('/')[1]);
    var year = Number(startDate.split('/')[2]);
    month = month - 1;
    var c = new Date(year + years, month, day);
    return this.transformDate(c);
  }

  monthExpiryDate(startDate: any, months: any) {
    var day = Number(startDate.split('/')[0]);
    var month = Number(startDate.split('/')[1]);
    month = month - 1;
    var year = Number(startDate.split('/')[2]);
    var dt = new Date(year, month, day);
    return this.transformDate(dt.setMonth(dt.getMonth() + months));
  }

  bindStaticErrorHTML(message: any) {
    let returnHTML = '<label style="color: #dd4b39;display: block;font-size:smaller"><i class="fa fa-times-circle-o"></i>' + message + '</label>';
    return returnHTML;
  }

  validateMobNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  titleCase(input: string): string {
    if (!input) {
      return '';
    } else {
      return input.replace(/\b\w/g, first => first.toLocaleUpperCase())
    }
  }

  validateEmail(emailValue: any) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(emailValue)) {
      return true;
    } else {
      return false;
    }
  }

  validateFormOneControls(elements: any, isdelete: boolean, controlNo: Number, message: string) {
    var hElement: HTMLElement = elements.element.nativeElement;
    var hhElement = hElement.getElementsByTagName('form');
    if (hhElement != null && hhElement.length > 0) {
      let thisElement = hhElement[0].elements[Number(controlNo)];
      if (isdelete) {
        if (thisElement.nextSibling != null && thisElement.nextSibling.nodeName == "LABEL" && thisElement.nextElementSibling != null) {
          thisElement.nextElementSibling.remove();
        }
      } else {
        if (thisElement.nextSibling != null && thisElement.nextSibling.nodeName == "LABEL" && thisElement.nextElementSibling != null) {
          thisElement.nextElementSibling.remove();
        }
        thisElement.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(message));
      }
    }
  }

  validateFormControls(elements: any, add: boolean, formPos: number = 0): boolean {
    let isValid: boolean = true;
    var hElement: HTMLElement = elements.element.nativeElement;
    var hhElement = hElement.getElementsByTagName('form');
    if (hhElement != null && hhElement.length > 0) {
      let zeroElement = hhElement[formPos];
      for (var obj in zeroElement) {
        if (zeroElement[obj] != null && zeroElement[obj].attributes != undefined) {
          let thisElementOuter = zeroElement[obj].attributes.getNamedItem('validationmessage');
          if (thisElementOuter != null) {
            let thisElement = zeroElement[obj];
            let controlValue = thisElement.value;
            if (thisElement.type == "radio" && add) {
              if (!thisElement.checked && thisElement.type == "radio") {
                if (thisElement.nextSibling != null && thisElement.nextElementSibling != null) {
                  thisElement.style.borderBottomColor = "#d2d6de";
                }
                let messages = thisElement.attributes.getNamedItem('validationMessage');
                thisElement.style.borderBottomColor = "#d2d6de";
                thisElement.style.borderBottom = "1px solid red"
                thisElement.insertAdjacentHTML('afterend', '');
                this.bindStaticErrorHTML(messages.nodeValue);
                isValid = false;
              }
              else {
                if (thisElement.nextSibling != null && thisElement.nextElementSibling != null) {
                  thisElement.style.borderBottomColor = "#d2d6de";
                  thisElement.nextElementSibling.remove();
                }
              }
            } else {
              if (controlValue != "" && thisElement.type == "email") {
                if (thisElement.nextSibling != null && thisElement.nextSibling.nodeName == "LABEL" && thisElement.nextElementSibling != null) {
                  thisElement.nextElementSibling.remove();
                }
                if (!this.validateEmail(controlValue)) {
                  let messages = "Please enter the valid email";
                  thisElement.style.borderBottom = "1px solid red"
                  thisElement.insertAdjacentHTML('afterend', '');
                  thisElement.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages));
                  isValid = false;
                }
              }
              else if (controlValue == "" && add) {
                if (thisElement.nextSibling != null && thisElement.nextSibling.nodeName == "LABEL" && thisElement.nextElementSibling != null) {
                  thisElement.nextElementSibling.remove();
                  thisElement.style.borderBottomColor = "#d2d6de";
                }
                let messages = thisElement.attributes.getNamedItem('validationMessage');
                thisElement.style.borderBottomColor = "#d2d6de";
                thisElement.style.borderBottom = "1px solid red"
                thisElement.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages.nodeValue));
                isValid = false;
              } else {
                if (thisElement.nextSibling != null && thisElement.nextSibling.nodeName == "LABEL" && thisElement.nextElementSibling != null) {
                  thisElement.nextElementSibling.remove();
                  thisElement.style.borderBottomColor = "#d2d6de";
                }
              }
            }

          }
        }
      }

      ///Added Checkbox group
      let checkboxgroup: any = zeroElement.getElementsByTagName('checkbox-group');
      for (var obj in checkboxgroup) {
        if (checkboxgroup[obj] != null && checkboxgroup[obj].attributes != undefined) {
          let thirdChilderns = checkboxgroup[obj].children;
          let isChecked: boolean = false;
          for (var objEl in thirdChilderns) {
            if (Number(objEl) >= 0) {
              let thisElementOuter: any = thirdChilderns[objEl].querySelector('input');
              if (thisElementOuter.checked) {
                isChecked = true;
              }
            }
          }
          if (!isChecked && add) {
            if (checkboxgroup[obj].parentElement.nextElementSibling != null && checkboxgroup[obj].parentElement.nextElementSibling.nodeName == "LABEL") {
              checkboxgroup[obj].parentElement.nextElementSibling.remove();
            }
            checkboxgroup[obj].insertAdjacentHTML('afterend', '');
            let messages = checkboxgroup[0].attributes.getNamedItem('validationMessage');
            if (messages != null) {
              checkboxgroup[obj].parentElement.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages.nodeValue));
              isValid = false;
            }
          } else {
            if (checkboxgroup[obj].parentElement.nextElementSibling != null && checkboxgroup[obj].parentElement.nextElementSibling.nodeName == "LABEL") {
              checkboxgroup[obj].parentElement.nextElementSibling.remove();
            }
          }
        }
      }

      ///Added ng-select
      let ngSelectgroup = zeroElement.getElementsByTagName('ng-select');
      for (var obj in ngSelectgroup) {
        if (ngSelectgroup[obj] != null && ngSelectgroup[obj].attributes != undefined) {
          let thirdChilderns: any = ngSelectgroup[obj];
          let tValue: any;
          tValue = thirdChilderns;
          if (tValue.attributes["required"] != undefined) {

            let tValueClass: string[] = [];
            if (tValue != "" && tValue != null && tValue != "undefined" && tValue.classList != null && tValue.classList != "") {
              tValue.classList.forEach((element: any) => {
                tValueClass.push(element);
              });
              if (tValueClass.find(x => x === "ng-invalid")) {
                let messages = tValue.attributes["validationMessage"].nodeValue;

                if (thirdChilderns.nextSibling != null && thirdChilderns.nextElementSibling != null) {
                  thirdChilderns.nextElementSibling.remove();
                }
                if (messages != null && add) {
                  thirdChilderns.style.borderBottomColor = "#d2d6de";
                  thirdChilderns.style.borderBottom = "1px solid red"
                  thirdChilderns.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages));
                  isValid = false;
                } else {
                  thirdChilderns.style.borderBottomColor = "#d2d6de";
                  thirdChilderns.style.borderBottom = "1px solid white"
                }
              }
              else {
                if (thirdChilderns.nextSibling != null && thirdChilderns.nextElementSibling != null) {
                  thirdChilderns.style.borderBottomColor = "#d2d6de";
                  thirdChilderns.nextElementSibling.remove();
                }
              }
            }
          }

          // let tValueClass: string[] = [];
          // if (tValue != "" && tValue != null && tValue != "undefined" && tValue.classList != null && tValue.classList != "") {
          //   tValue.classList.forEach(element => {
          //     tValueClass.push(element);
          //   });
          //   if (tValueClass.find(x => x === "ng-invalid") && add) {
          //     let messages = tValue.attributes["validationMessage"].nodeValue;
          //     if (thirdChilderns.nextSibling != null) {
          //       thirdChilderns.nextElementSibling.remove();
          //     }
          //     if (messages != null) {
          //       thirdChilderns.insertAdjacentHTML('afterend', '');
          //       thirdChilderns.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages));
          //       isValid = false;
          //     }
          //   }
          //   else {
          //     if (thirdChilderns.nextSibling != null && thirdChilderns.nextElementSibling != null) {
          //       thirdChilderns.nextElementSibling.remove();
          //     }
          //   }
          // }
        }
      }

      ///Added angular2-multiselect
      let ngMultiSelectgroup = zeroElement.getElementsByTagName('angular2-multiselect');
      for (var obj in ngMultiSelectgroup) {
        if (ngMultiSelectgroup[obj] != null && ngMultiSelectgroup[obj].attributes != undefined && ngMultiSelectgroup[obj].attributes.hasOwnProperty('required')) {
          let thirdChilderns = ngMultiSelectgroup[obj];
          let tValue: any;
          tValue = thirdChilderns;
          let tValueClass: string[] = [];
          if (tValue != "" && tValue != null && tValue != "undefined" && tValue.classList != null && tValue.classList != "") {
            tValue.classList.forEach((element: any) => {
              tValueClass.push(element);
            });
            if (tValueClass.find(x => x === "ng-invalid") && add) {
              let messages = tValue.attributes["validationMessage"].nodeValue;
              if (thirdChilderns.nextSibling != null && thirdChilderns.nextElementSibling != null) {
                thirdChilderns.nextElementSibling.remove();
              }
              if (messages != null) {
                thirdChilderns.insertAdjacentHTML('afterend', '');
                thirdChilderns.insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages));
                isValid = false;
              }
            }
            else {
              if (thirdChilderns.nextSibling != null) {
                if (thirdChilderns.nextElementSibling != null)
                  thirdChilderns.nextElementSibling.remove();
              }
            }
          }
        }
      }

      ///Added Radio Button group
      let radioButtngroup: any = zeroElement.getElementsByTagName('radio-group');
      for (var obj in radioButtngroup) {
        if (radioButtngroup[obj] != null && radioButtngroup[obj].attributes != undefined) {
          let thirdChilderns = radioButtngroup[obj].children;
          let isChecked: boolean = false;
          for (var objEl in thirdChilderns) {
            if (Number(objEl) >= 0) {
              let thisElementOuter: any = thirdChilderns[objEl].querySelector('input');
              if (thisElementOuter.checked) {
                isChecked = true;
              }
            }
          }
          if (!isChecked && add) {
            if (radioButtngroup[obj].nextElementSibling != null) {
              radioButtngroup[obj].nextElementSibling.remove();
            }
            radioButtngroup[obj].insertAdjacentHTML('afterend', '');
            let messages = radioButtngroup[obj].attributes.getNamedItem('validationMessage');
            if (messages != null) {
              radioButtngroup[obj].insertAdjacentHTML('afterend', this.bindStaticErrorHTML(messages.nodeValue));
              isValid = false;
            }
          } else {
            if (radioButtngroup[obj].nextElementSibling != null) {
              radioButtngroup[obj].nextElementSibling.remove();
            }
          }
        }
      }

    }
    return isValid;
  }

  signOut() {
    localStorage.removeItem('user_information');
    localStorage.removeItem(API_GATEWAY.ACCESS_TOKEN_KEY)
    window.location.href = API_GATEWAY.LOGOUT_USER_URL;
  }

  multiSelectSettings(placeHolder: string, isSingle: boolean, disabled: boolean = false) {
    if (isSingle) {
      return {
        singleSelection: true,
        text: placeHolder,
        enableSearchFilter: true,
        showCheckbox: true,
        disabled: disabled
      };
    } else {
      return {
        enableSearchFilter: true,
        showCheckbox: true,
        singleSelection: false,
        text: placeHolder,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
      };
    }
  }

  BindMultiSelect(items: any): any {
    let returnArray = [];
    if (items != null && items != undefined && items.length > 0) {
      for (let data of items) {
        let dataObject = {};
        dataObject = { "id": data.dataValueField, "itemName": data.dataTextTField, "originalId": data.dataValueTField };
        returnArray.push(dataObject);
      }
    }
    return returnArray;
  }

  showminimumcontent(content: any) {
    let contentvalue: string = '';
    if (content != null && content.length > 50) {
      contentvalue = content.substring(0, 50) + "...";
    }
    else {
      contentvalue = content;
    }
    return contentvalue;
  }

  validresponse(response: any) {
    if (response != null && response.hasOwnProperty('status') && !Boolean(response.status)) {
      if (response.errorMessage != null && response.errorMessage.statusCode == 422) {
        this.ShowWarning(response.errorMessage.message);
      }

    }
  }

  getLocalizationObject(objectName: string, SelectedLanguage: string) {
    let LocalizationJsn: any;

    LocalizationJsn = localStorage.getItem(API_GATEWAY.EN_Localization);

    return JSON.parse(LocalizationJsn)[objectName];
  }

  getUserLocalizationSelection(): any {
    let LocalizationJsn = "EN";
    if (LocalizationJsn != null)
      return LocalizationJsn;
  }

}
