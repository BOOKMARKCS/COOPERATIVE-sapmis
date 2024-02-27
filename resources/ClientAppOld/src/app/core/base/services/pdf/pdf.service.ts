import { Injectable } from '@angular/core';
import {  generate } from "@pdfme/generator";
import { projectData, projectSchemas } from "./static/templates/inputs/project.pdfInputs";
import { projectReportData, projectReportSchemas } from "./static/templates/inputs/projectReport.pdfInputs";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
  }


}


async function generatePDF(value: any,type:string) {
  let schemas;
  let data;
  switch (type) {
    case 'project':
      schemas = projectSchemas
      data = projectData(value)
      break;
    case 'projectReport':
      schemas = projectReportSchemas
      data = projectReportData(value)
      break;
  }
  console.log({value})
  const template: any = {
    schemas: [ schemas ]
  }

  let inputs:any = data


  const font = {
    Regular: { data: await fetch('/assets/fonts/Sarabun-Regular.ttf').then((res) => res.arrayBuffer()), fallback: true, },
    Bold: { data: await fetch('/assets/fonts/Sarabun-Bold.ttf').then((res) => res.arrayBuffer()), },
  }

  const options = { font, };
  // const domContainer: any = document.getElementById('pdf');
  // let designer = new Designer({domContainer, template, options: {font}});
  // designer.onChangeTemplate((template) => {
  //   console.log('Template has changed:', template);
  // });
  generate({template, inputs, options: {font}}).then((pdf) => {
    const blob = new Blob([pdf.buffer], {type: 'application/pdf'});
    window.open(URL.createObjectURL(blob));
  });
}

// function setInputs(){
//   let inputs:any = [];
//   projectReportData.map(item => inputs.push(item))
//   // deliveryNote.map(item => inputs.push(item));
//   // projectData.map((item:any) => projectData.push(item))
//   // projectData.map(item => inputs.push(item));
//     // inputs.push(projectData)
//   // return projectData
//   return inputs
//
// }

export { generatePDF }
