import { ProjectStatus } from "../../../core/domain/stateManagement/projectStatus";
import { Role } from "../../../core/domain/stateManagement/role";
import { HttpClient } from "@angular/common/http";
import { ProjPath } from "../../../core/domain/stateManagement/ProjPath";
import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

const camelCase = (input: string) => input.split(/[_\- \/]+/).map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
const arrayContainers: string[] = ['advisorNames', 'responsibleStudents','achievingObjectives'];


function toNumber(value: any): number {
    return parseFloat(value);
}

function isPrimitive(value: any): boolean {
    return (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean');
}

function patchArrayValue(formGroup: FormGroup, data: any) {
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) setFormArrayValue(formGroup, getFormArray({form: formGroup, formArrayName: key}), key, value)
        else if (typeof value == 'object' && value) setFormObjectValue(formGroup, getFormArray({
          form: formGroup,
          formArrayName: key
        }), key, value)
        else if (value) setFormPrimitiveValue(formGroup.get(key), value)
    })
}

function setFormArrayValue(formGroup: FormGroup, form: any, key: string, value: any) {
    if (form) {
        if (form instanceof FormArray && typeof value[0] !== 'object' || !Array.isArray(value) || arrayContainers.includes(key) || key === 'otherCounts') form.clear()
        if (Array.isArray(value)) {
            Object.values(value).forEach((valueItem: any) => {
                if (isPrimitive(valueItem)) form.push(new FormControl(valueItem))
                else if (typeof valueItem === 'object' && !Array.isArray(valueItem) && valueItem) {
                    setFormObjectValue(formGroup, form, key, valueItem)
                }
            })
        } else if (isPrimitive(value) && typeof value != "object") form.setValue(value);
        else Object.values(value).forEach((valueItem: any) => valueItem.forEach((v: any) => form.push(new FormControl(v))))
    }
    // else console.error(`FormArray for key "${key}" is not available or not an instance of FormArray.`);
}

function setFormObjectValue(formGroup: any, form: any, key: string, value: any) {
    if (form) {
        if (typeof value === 'object') {
            let newFormControl = new FormGroup({})
            let newFormAttendantOtherCounts = new FormGroup({})
            Object.entries(value).forEach(([keyItem, valueItem]) => {
                if (Array.isArray(valueItem)) {
                    if (formGroup.get(key) instanceof FormGroup) setFormArrayValue(formGroup, getFormGroupArray(formGroup, key, keyItem), key, {valueItem})
                    else if (form instanceof FormArray) {
                        setFormArrayValue(formGroup, getFormTwoArray(formGroup, key, keyItem), keyItem, valueItem)
                    }
                } else if (typeof valueItem === 'object' && valueItem) {
                    Object.entries(valueItem).forEach(([k, v]) => getFormArray({form: formGroup, formArrayName: key}).at(0).get([keyItem, k])?.patchValue(v))
                } else if (formGroup.get(key) instanceof FormGroup && valueItem) setFormPrimitiveValue(formGroup.get(key)?.get(keyItem), valueItem)
                else if (formGroup.get(key) instanceof FormArray) {
                    if (arrayContainers.includes(key)) newFormControl.addControl(keyItem, new FormControl(valueItem))
                    else if (isPrimitive(valueItem)) setFormPrimitiveValue(getFormArray({
                      form: formGroup,
                      formArrayName: key
                    }).at(0).get(keyItem), valueItem)
                } else newFormAttendantOtherCounts.addControl(keyItem, new FormControl(valueItem))
            });
            if (arrayContainers.includes(key)) form.push(newFormControl)
            if (key == 'otherCounts') form.push(newFormAttendantOtherCounts)
        } else console.error(`Failed to set value for key "${key}" - value is not an object.`);
    }
    // else console.error(`FormArray for key "${key}" is not available or not an instance of FormArray.`);
}

function getFormArray({form, formArrayName}: { form: FormGroup, formArrayName: string }) {
    return (form.get(formArrayName) as FormArray);
}

function getFormTwoArray(form: FormGroup, formArrayOne: any, formArrayTwo: any, index: number = 0) {
    return (((form.get(formArrayOne) as FormArray)).at(index).get(formArrayTwo) as FormArray);
}

function getFormGroupArray(form: FormGroup, formGroupName: string, formArrayName: string) {
    return (form.get([formGroupName, formArrayName]) as FormArray);
}

function setFormPrimitiveValue(form: any, value: any) {
    if (form) isPrimitive(value) ? form.setValue(value) : console.error(`Failed to set value is not a primitive.`);
}

const increasedStatus = (role: string, index: number = 0) => Object.values(ProjectStatus)[Object.values(Role).findIndex(r => r == role) + index]
const calculateTotalCost = (value: any): number => {
    let total: number = 0;
    value.forEach((sum: number) => total += toNumber(sum) | 0)
    return toNumber(total)
}

const getIndexArray = (array: any) => Array.from({length: array.length}, (_, i) => i);

function addFormControl(formArray: FormArray, values: any = '') {
    if (formArray) {
        const newFormGroup = new FormGroup({},[Validators.required]);
        Object.keys(formArray.value).forEach(() => {
            if (typeof formArray.value[0] == "object") Object.keys(formArray.value[0]).forEach(key => newFormGroup.addControl(key, new FormControl((values ? values[key] : null),[Validators.required])))
        })
        formArray.push(newFormGroup);
    }
}

function totalAttendants(attendant: any) {
    let totalAdvisor = toNumber(attendant?.['advisorCount']?.['Male']) + toNumber(attendant?.['advisorCount']?.['Female'])
    let totalStudentCount = toNumber(attendant?.['studentCount']?.['Male']) + toNumber(attendant?.['studentCount']?.['Female'])
    let totalTeacherCount = toNumber(attendant?.['teacherCount']?.['Male']) + toNumber(attendant?.['teacherCount']?.['Female'])
    let totalOtherCounts = 0;
    attendant['otherCounts'].forEach((item: any) => totalOtherCounts += toNumber(item.Male) + toNumber(item.Female))
    return toNumber(totalAdvisor) + toNumber(totalStudentCount) + toNumber(totalTeacherCount) + toNumber(totalOtherCounts);
}

@Injectable({ providedIn: 'root' })
class ProjService {
    constructor(private http: HttpClient) { }
    get = (path: ProjPath, param: any | null = '') => this.http.get(path, {params: {param}})
    post = (path: ProjPath, data: any) => this.http.post(path, data);
    delete = (path: ProjPath, data: any) => this.http.post(path, data)
}

export {
    camelCase,
    increasedStatus,
    calculateTotalCost,
    ProjService,
    toNumber,
    addFormControl,
    getIndexArray,
    patchArrayValue, totalAttendants

}
