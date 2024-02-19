import { IProject } from "../../../../../../domain/entities/proj/project";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { toNumber } from "../../../../../../../presentation/features/proj/proj.service";

let deliveryNoteSchemas_setPage: any = {
    page_1: {
        "ใบนำส่งอนุมัติ": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 20.21
            },
            "width": 172.74,
            "height": 12.83,
            "fontName": "Bold",
            "alignment": "center",
            "fontSize": 14
        },
        "ชื่อองค์การ": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 45.5
            },
            "width": 170.89,
            "height": 9.67,
            "fontName": "Regular",
            "fontSize": 12,
            "alignment": "left"
        },
        "เนื้อหา": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 94.3
            },
            "width": 170.89,
            "height": 147.41,
            "fontName": "Regular",
            "fontSize": 12
        },
        "วันที่": {
            "type": "text",
            "position": {
                "x": 112.38,
                "y": 55.83
            },
            "width": 76.53,
            "height": 10.44,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "เรื่อง": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 70.11
            },
            "width": 170.89,
            "height": 7.53,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "เรียน": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 79.9
            },
            "width": 170.89,
            "height": 8.58,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ที่ปรึกษากิจกรรม": {
            "type": "text",
            "position": {
                "x": 18.96,
                "y": 240.74
            },
            "width": 83.13,
            "height": 24.71,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ผู้รับผิดชอบ": {
            "type": "text",
            "position": {
                "x": 110.45,
                "y": 240.74
            },
            "width": 83.13,
            "height": 24.71,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        }
    },
    page_2: {
        "ความเห็นของสโมสร": {
            "type": "text",
            "position": {
                "x": 18.91,
                "y": 19.69
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อสโมสร": {
            "type": "text",
            "position": {
                "x": 71.33,
                "y": 59
            },
            "width": 118.05,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 14,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความเห็นของที่ปรึกษา": {
            "type": "text",
            "position": {
                "x": 19.07,
                "y": 84.26
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 14,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อที่ปรึกษา": {
            "type": "text",
            "position": {
                "x": 71.48,
                "y": 123.57
            },
            "width": 118.58,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 14,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความเห็นขององค์การนิสิต": {
            "type": "text",
            "position": {
                "x": 19.01,
                "y": 149.41
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อองค์การนิสิต": {
            "type": "text",
            "position": {
                "x": 71.43,
                "y": 188.71
            },
            "width": 118.05,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความเห็นของสภานิสิต": {
            "type": "text",
            "position": {
                "x": 19.17,
                "y": 213.98
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อสภานิสิต": {
            "type": "text",
            "position": {
                "x": 71.58,
                "y": 253.29
            },
            "width": 118.58,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        }
    },
    page_3: {
        "ความเห็นของฝ่ายกิจการ": {
            "type": "text",
            "position": {
                "x": 18.91,
                "y": 19.69
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อฝ่ายกิจการ": {
            "type": "text",
            "position": {
                "x": 71.33,
                "y": 52.91
            },
            "width": 118.05,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความเห็นของสำนักงาน": {
            "type": "text",
            "position": {
                "x": 19.07,
                "y": 69.71,
            },
            "width": 171.26,
            "height": 55.13,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อสำนักงาน": {
            "type": "text",
            "position": {
                "x": 71.48,
                "y": 131.28,
            },
            "width": 118.58,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความเห็นของรอง/ผู้ช่วยคณบดี": {
            "type": "text",
            "position": {
                "x": 19.01,
                "y": 149.41
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อรอง/ผู้ช่วยคณบดี": {
            "type": "text",
            "position": {
                "x": 71.43,
                "y": 188.71
            },
            "width": 118.05,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "บันทึกสั่งการของคณบดี": {
            "type": "text",
            "position": {
                "x": 19.17,
                "y": 213.98
            },
            "width": 171.26,
            "height": 34.23,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ลงชื่อบันทึกสั่งการของคณบดี": {
            "type": "text",
            "position": {
                "x": 71.58,
                "y": 253.29
            },
            "width": 118.58,
            "height": 16.21,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        }
    }
}

let deliveryNoteInputs = function (proj:any) {
    return [
        {
            "ใบนำส่งอนุมัติ": "ใบนำส่งรายงานอนุมัติโครงการกิจกรรมนิสิตที่ขอใช้เงินค่าบำรุงกิจกรรม/กีฬา (สำหรับสโมสรนิสิตคณะ)",
            "ชื่อองค์การ": `ที่ ${parseInt(proj.projectId.substr(-4),10)} / ${new Date(proj.createdDate).getFullYear()} \t                                                      (ชื่อองค์กรนิสิต)..............................................`,
            "เนื้อหา": `สิ่งที่ส่งมาด้วย\t1. โครงการ\t\t                 \t\tจำนวน\t\t1\tชุด\n\t\t                   2. กำหนดการโดยละเอียด\t \tจำนวน\t\t1\tชุด\n\t\t                \n\t\t\t\t\t\tด้วย(ชื่อองค์กรนิสิต)....................................................................................กำหนดจัด โครงการ ${proj.projectName} วันที่ ${duration(proj.startTime,proj.endTime)} ณ ${proj.location.replace(/^ณ /, '')} โดยมีวัตถุประสงค์เพื่อ(โดยสังเขป)................................................................................................................................................................................................................................................................................................นั้น   \n\t\t                        \n\t\t\t\t\t\tในการนี้(ชื่อองค์กรนิสิต).........................................................................................จึงขอ อนุมัติโครงการ ${proj.projectName} โดยมี........................................เป็นที่ปรึกษาโครงการ รายละเอียดดังเอกสารแนบ\n\n\n                        จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ`,
            "วันที่": `วันที่ ${format(new Date(proj.createdDate),'dd MMMM yyyy', {locale: th})}`,
            "เรื่อง": `เรื่อง\tขออนุมัติโครงการ ${proj.projectName}`,
            "เรียน": `เรียน\tคณบดี ${proj.approved.deanName}`,
            "ที่ปรึกษากิจกรรม": ` (ลงชื่อ)............................................\n\n  (  ${proj.approved.scaName}  )\n\tที่ปรึกษากลุ่มกิจกรรม`,
            "ผู้รับผิดชอบ": ` (ลงชื่อ)............................................\n\n  (  ${proj.responsibleStudents[0].name}  )\nผู้รับผิดชอบโครงการ`
        },
        {
            "ความเห็นของสโมสร": `1. ความเห็นของสโมสรนิสิตคณะ\n\n............................................................................................................................................................................................................................................................................................................................................................................................................................................`,
            "ลงชื่อสโมสร": `(ลงชื่อ)................................. ....../....../......               \t   \n          (................................)`,
            "ความเห็นของที่ปรึกษา": `2. ความเห็นของที่ปรึกษาสโมสรนิสิตคณะ\n\n  ${proj.approved.scaComment}  `,
            "ลงชื่อที่ปรึกษา": `(ลงชื่อ)................................. ${format(new Date(proj.approved.scaDate),'dd/MMMM/yyyy',{locale:th})}               \t   \n          (  ${proj.approved.scaName}  )`,
            "ความเห็นขององค์การนิสิต": `3. ความเห็นขององค์การนิสิต\n\n  ${proj.approved.soComment}  `,
            "ลงชื่อองค์การนิสิต": `(ลงชื่อ).................................  ${format(new Date(proj.approved.soDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.soName}  )`,
            "ความเห็นของสภานิสิต": `4. ความเห็นของสภานิสิต\n\n  ${proj.approved.scComment}  `,
            "ลงชื่อสภานิสิต": `(ลงชื่อ).................................  ${format(new Date(proj.approved.scDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.scName}  )`,
        },
        {
            "ความเห็นของฝ่ายกิจการ": `5. ความเห็นของฝ่ายกิจการนิสิตวิทยาเขตพัทลุง\n\n  ${proj.approved.scaComment}  \n`,
            "ลงชื่อฝ่ายกิจการ": `(ลงชื่อ).................................  ${format(new Date(proj.approved.affDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.affName}  )`,
            "ความเห็นของสำนักงาน": "6. ความเห็นของสำนักงานคณะ\n\n 	\tพิจารณากลั่นกรองเรียบร้อยแล้ว\n\n\t	 กันเงินในวงเงิน.........................บาท\n\n\t \tวงเงินคงเหลือ...........................บาท \n............................................................................................................................................................................................................................................................................................................................................................................................................................................",
            "ลงชื่อสำนักงาน": `(ลงชื่อ).................................  ${format(new Date(proj.approved.foDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.foName}  )`,
            "ความเห็นของรอง/ผู้ช่วยคณบดี": `7. ความเห็นของรองคณบดี/ผู้ช่วยคณบดี\n\n  ${proj.approved.ddComment}  `,
            "ลงชื่อรอง/ผู้ช่วยคณบดี": `(ลงชื่อ).................................  ${format(new Date(proj.approved.ddDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.ddName}  )`,
            "บันทึกสั่งการของคณบดี": `8. บันทึกสั่งการของคณบดี\n\n ${proj.approved.deanComment}  `   ,
            "ลงชื่อบันทึกสั่งการของคณบดี": `(ลงชื่อ).................................  ${format(new Date(proj.approved.deanDate),'dd/MMMM/yyyy',{locale:th})}              \t   \n          (  ${proj.approved.deanName}  )`
        }
    ]
}
let projInputs: any;
let projectSchemas_setPage: any = {
    page_1: {
        "แบบรายงานอนุมัติ": {
            "type": "text",
            "position": {
                "x": 15.14,
                "y": 18.89
            },
            "width": 182.37,
            "height": 9.91,
            "alignment": "center",
            "fontSize": 14,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold"
        },
        "ชื่อโครงการ": {
            "type": "text",
            "position": {
                "x": 17.92,
                "y": 30.73
            },
            "width": 173.1,
            "height": 8.32,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ชื่อกลุ่มกิจกรรมนิสิต": {
            "type": "text",
            "position": {
                "x": 17.86,
                "y": 40.71
            },
            "width": 179.1,
            "height": 18.37,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "รายชื่อนิสิต": {
            "type": "text",
            "position": {
                "x": 18.06,
                "y": 59.98
            },
            "width": 179.1,
            "height": 36.09,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "รายชื่อที่ปรึกษา": {
            "type": "text",
            "position": {
                "x": 18.01,
                "y": 92.38
            },
            "width": 179.1,
            "height": 26.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ประเภทกิจกรรม": {
            "type": "text",
            "position": {
                "x": 18.12,
                "y": 115.45
            },
            "width": 179.1,
            "height": 70.71,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "ความสอดคล้อง": {
            "type": "text",
            "position": {
                "x": 17.95,
                "y": 225.76
            },
            "width": 173.1,
            "height": 65.45,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular"
        }
    },
    page_2: {
        "หลักการและเหตุผล": {
            "type": "text",
            "position": {
                "x": 20,
                "y": 20
            },
            "width": 180,
            "height": 91.97,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "top"
        },
        "วัตถุประสงค์": {
            "type": "text",
            "position": {
                "x": 20.1,
                "y": 115.21
            },
            "width": 170,
            "height": 9.68,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "ตาราง8": {
            "type": "text",
            "position": {
                "x": 19.89,
                "y": 130.12
            },
            "width": 170,
            "height": 55.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "8ลำดับ": {
            "type": "text",
            "position": {
                "x": 20.04,
                "y": 130.12
            },
            "width": 16.27,
            "height": 54.99,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "8วัตถุประสงค์": {
            "type": "text",
            "position": {
                "x": 36.43,
                "y": 130.12
            },
            "width": 39.72,
            "height": 55.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "8รูปแบบกิจกรรม": {
            "type": "text",
            "position": {
                "x": 76.59,
                "y": 130.12
            },
            "width": 40.72,
            "height": 55.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "8ประเมินผล": {
            "type": "text",
            "position": {
                "x": 117.81,
                "y": 130.06
            },
            "width": 40.72,
            "height": 55.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "8หมายเหตุ": {
            "type": "text",
            "position": {
                "x": 159.03,
                "y": 130.02
            },
            "width": 31.54,
            "height": 55.3,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "รูปแบบกิจกรรม": {
            "type": "text",
            "position": {
                "x": 19.88,
                "y": 188.3
            },
            "width": 170,
            "height": 47.84,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "ผู้เข้าร่วมโครงการ": {
            "type": "text",
            "position": {
                "x": 20.05,
                "y": 232.06
            },
            "width": 170,
            "height": 47.89,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        }
    },
    page_3: {
        "สถานที่ปฏิบัติงาน ": {
            "type": "text",
            "position": {
                "x": 19.89,
                "y": 20
            },
            "width": 168.96,
            "height": 13.87,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "เวลเปฏิบัติงาน": {
            "type": "text",
            "position": {
                "x": 19.99,
                "y": 37.27
            },
            "width": 168.96,
            "height": 13.87,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "วิธีการดำเนินงาน": {
            "type": "text",
            "position": {
                "x": 19.87,
                "y": 54.68
            },
            "width": 168.95,
            "height": 55.94,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "งบประมาณ": {
            "type": "text",
            "position": {
                "x": 19.99,
                "y": 113.99
            },
            "width": 169.37,
            "height": 9.87,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        },
        "ตาราง 14": {
            "type": "text",
            "position": {
                "x": 20,
                "y": 127
            },
            "width": 170,
            "height": 84.53,
            "alignment": "left",
            "fontSize": 13,
            "characterSpacing": 0,
            "lineHeight": 1,
            "fontName": "Regular"
        },
        "รวมเงิน14": {
            "type": "text",
            "position": {
                "x": 20.09,
                "y": 215.6
            },
            "width": 169.37,
            "height": 17.28,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        },
        "รายการ14": {
            "type": "text",
            "position": {
                "x": 20.02,
                "y": 127.19
            },
            "width": 112.95,
            "height": 84.51,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "จำนวนเงิน14": {
            "type": "text",
            "position": {
                "x": 133.72,
                "y": 127.19
            },
            "width": 55.8,
            "height": 84.51,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        }
    },
    page_4: {
        "ผลที่คาดว่าจะได้รับ": {
            "type": "text",
            "position": {
                "x": 20,
                "y": 20
            },
            "width": 180,
            "height": 35.71,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "เป้าหมาย": {
            "type": "text",
            "position": {
                "x": 20.1,
                "y": 60.09
            },
            "width": 180,
            "height": 57.13,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "วิธีการติดตาม": {
            "type": "text",
            "position": {
                "x": 20.1,
                "y": 121.28
            },
            "width": 180,
            "height": 33.85,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "กำหนดส่งรายงาน": {
            "type": "text",
            "position": {
                "x": 20.04,
                "y": 159.05
            },
            "width": 170,
            "height": 15.6,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "ผู้เสนอโครงการ": {
            "type": "text",
            "position": {
                "x": 19.95,
                "y": 178.64
            },
            "width": 170,
            "height": 10.57,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "ลงชื่อที่ปรึกษากลุ่มกิจกรรม": {
            "type": "text",
            "position": {
                "x": 19.95,
                "y": 218.08
            },
            "width": 80,
            "height": 25.71,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "ลงชื่อผู้รับผิดชอบ": {
            "type": "text",
            "position": {
                "x": 110.68,
                "y": 218.28
            },
            "width": 80,
            "height": 25.71,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        }
    },
    page_5: {
        "กำหนดการอย่างละเอียด": {
            "type": "text",
            "position": {
                "x": 20,
                "y": 20
            },
            "width": 60,
            "height": 7,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        },
        "ตราม.": {
            "type": "text",
            "position": {
                "x": 90.51,
                "y": 29
            },
            "width": 31,
            "height": 53,
            "alignment": "center",
            "fontSize": 13,
            "characterSpacing": 0,
            "lineHeight": 1,
            "fontName": "Regular",
            "verticalAlignment": "middle"
        },
        "กำหนดการตาราง": {
            "type": "text",
            "position": {
                "x": 20.08,
                "y": 87.47
            },
            "width": 170,
            "height": 38.44,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        },
        "ตาราง20 ": {
            "type": "text",
            "position": {
                "x": 19.92,
                "y": 131.87
            },
            "width": 170,
            "height": 58.55,
            "alignment": "center",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        },
        "วัน / เวลา 20": {
            "type": "text",
            "position": {
                "x": 20.1,
                "y": 131.86
            },
            "width": 60,
            "height": 58.8,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "top"
        },
        "กิจกรรม 20": {
            "type": "text",
            "position": {
                "x": 80.37,
                "y": 132.07
            },
            "width": 109.47,
            "height": 58.8,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "top"
        },
        "หมายเหตุ 20": {
            "type": "text",
            "position": {
                "x": 20.1,
                "y": 196.35
            },
            "width": 131.44,
            "height": 6.73,
            "alignment": "left",
            "fontSize": 12,
            "characterSpacing": 1,
            "lineHeight": 1,
            "fontName": "Bold",
            "verticalAlignment": "middle"
        }
    }
}
let projectSchemas: any = {
    ...deliveryNoteSchemas_setPage.page_1,
    ...deliveryNoteSchemas_setPage.page_2,
    ...deliveryNoteSchemas_setPage.page_3,
    ...projectSchemas_setPage.page_1,
    ...projectSchemas_setPage.page_2,
    ...projectSchemas_setPage.page_3,
    ...projectSchemas_setPage.page_4,
    // ...projectSchemas_setPage.page_5
}

function setResponsibleStudents(value: any, titleNumber: number) {
    let output: any = [];
    value.map((item: any, index: number) => output.push(titleNumber + '.' + (index + 1) + '  ' + item.name + '\t รหัสประจำตัวนิสิต ' + item.studentId + '\n\t\t     หมายเลขโทรศัพท์ ' + item.phoneNumber))
    return output.join('\n\t ');
}

function setAdvisorNames(value: any, titleNumber: number) {
    let output: any = [];
    value.map((item: any, index: number) => output.push(titleNumber + '.' + (index + 1) + '  ' + item.name + '\t หมายเลขโทรศัพท์ ' + item.phoneNumber))
    return output.join('\n\t ');
}

function setArrayValue(value:any,titleNumber:number|null,firstData:string = '',index:number = 0){
    let output: any = [];
    value.map((item: any, i: number) => output.push(firstData + (titleNumber?titleNumber + '.' + (i + 1 + index) : '') + '  ' +  item))
    return output.join('\n\t ');
}
let duration = (startTime:Date,endTime:Date) =>  `ระหว่างวันที่ ${format(new Date(startTime),'dd MMMM yyyy',{locale:th})} ถึงวันที่ ${format(new Date(endTime),'dd MMMM yyyy',{locale:th})}`
let projectInputs = function (proj: IProject) {
    return [
        {
            "แบบรายงานอนุมัติ": "แบบรายงานอนุมัติผลโครงการกิจกรรมนิสิต (สำหรับสโมสรนิสิตคณะ)",
            "ชื่อโครงการ": `1.ชื่อโครงการ ${proj?.projectName}`, //70
            "ชื่อกลุ่มกิจกรรมนิสิต": `2.ชื่อกลุ่มกิจกรรมนิสิตที่รับผิดชอบโครงการ\n\n\t  ${proj?.activityGroupName}`,//108
            "รายชื่อนิสิต": `3.รายชื่อนิสิตผู้รับผิดชอบโครงการ\n\n\t ${setResponsibleStudents(proj.responsibleStudents, 3)}`, //3.1 name 51 studentId 22 phoneNumber 19
            "รายชื่อที่ปรึกษา": `4.รายชื่อที่ปรึกษาโครงการ\n\n\t ${setAdvisorNames(proj.advisorNames,4)}`, //4.1 51
            "ประเภทกิจกรรม": "5.ประเภทกิจกรรมพัฒนานิสิตนอกชั้นเรียน(กรณีขอเทียบกิจกรรมพัฒนานิสิตนอกชั้นเรียน โปรดระบุ)\n\n กลุ่มกิจกรรม TSU Glocal Talent\n\n\t\t [ ] กลุ่มกิจกรรมเกี่ยวกับการคิด วิจารณญาณ และการแก้ปัญหา\n\n\t\t [ ] กลุ่มกิจกรรมเกี่ยวกับการบริหารจัดการตนเอง\n\n\t\t [ ]  กลุ่มกิจกรรมเกี่ยวกับการทำงานร่วมกับผู้อื่น\n\n\t\t [ ]  กลุ่มกิจกรรมเกี่ยวกับความรู้ ความเข้าใจ และการใช้เทคโนโลยีดิจิทัล\n\n\t\t [ ]  กลุ่มกิจกรรม TSU Good ได้แก่ กิจกรรมจิตอาสา บำเพ็ญประโยชน์ และสิ่งแวดล้อม\n\n กลุ่มกิจกรรม TSU Communication Talent\n\n\t\t [ ]  กิจกรรมเกี่ยวกับการใช้ภาษาเพื่อการสื่อสารในชีวิตประจำวัน\n\n กลุ่มกิจกรรม TSU Social Innovation/Entrepreneurship Talent\n\n\t\t [ ] กลุ่มกิจกรรมด้านการสร้างนวัตกรรมสังคม\n\n\t\t [ ] กลุ่มกิจกรรมด้านการเป็นผู้ประกอบการ",
            "ความสอดคล้อง": "6. ความสอดคล้องกับยุทธศาสตร์ของมหาวิทยาลัย\n\n\t     [ ] กิจกรรมเสริมสร้างนิสิตให้มีคุณลักษณะตามอัตลักษณ์ของมหาวิทยาลัย\n\n\t\t [ ] กิจกรรมพัฒนานิสิตให้มีทักษะการเรียนรู้ในศตวรรษที่ 21\n\n\t\t [ ] กิจกรรมนิสิตระหว่างประเทศ\n\n\t\t [ ] กิจกรรมพหุวัฒนธรรม ศิลปวัฒนธรรม และแลกเปลี่ยนวัฒนธรรม\n\n\t\t [ ] กิจกรรมกีฬา นันทนาการ และสุขภาพ\n\n\t\t [ ] กิจกรรมจิตอาสาทั้งภายในและชุมชนโดยรอบมหาวิทยาลัยทักษิณ\n"
        },
        {
            "หลักการและเหตุผล": `7. หลักการและเหตุผล\n\n\t ${(proj.background.replace(/\n/g, '\n\t'))}`,
            "วัตถุประสงค์": "8. วัตถุประสงค์ของโครงการ (จัดเพื่ออะไร)",
            "ตาราง8": "",
            "8ลำดับ": "\nลำดับที่\n\n   8.1\n\n   8.2\n\n   8.3\n\n   8.4\n\n   8.5\n\n",
            "8วัตถุประสงค์": `\n     วัตถุประสงค์\n\n           ${setArrayValue(proj.objectives,8.1)}`,
            "8รูปแบบกิจกรรม": `\n    รูปแบบกิจกรรม\n\n           8.1\n\n           8.2\n\n           8.3\n\n           8.4\n\n           8.5\n\n`,
            "8ประเมินผล": "\n      ประเมินผล\n\n           8.1\n\n           8.2\n\n           8.3\n\n           8.4\n\n           8.5\n\n",
            "8หมายเหตุ": "\n    หมายเหตุ\n\n        8.1\n\n        8.2\n\n        8.3\n\n        8.4\n\n        8.5\n\n",
            "รูปแบบกิจกรรม": `9. รูปแบบกิจกรรม\n\n\t ${setArrayValue(proj.activityFormats,9)}`,
            "ผู้เข้าร่วมโครงการ": `10. ผู้เข้าร่วมโครงการ\n\n\t10.1 ที่ปรึกษา\t\t  ชาย ${proj.attendants[0].advisorCount?.Male} คน       หญิง ${proj.attendants[0].advisorCount?.Female} คน     รวม ${toNumber(proj.attendants[0].advisorCount?.Male) + toNumber(proj.attendants[0].advisorCount?.Female)} คน\n\t10.2 นิสิต\t\t\t     ชาย ${proj.attendants[0].studentCount?.Male} คน       หญิง ${proj.attendants[0].studentCount?.Female} คน     รวม ${toNumber(proj.attendants[0].studentCount?.Male) + toNumber(proj.attendants[0].studentCount?.Female)} คน\n    10.3 อาจารย์\t\t\tชาย ${proj.attendants[0].teacherCount?.Male} คน       หญิง ${proj.attendants[0].teacherCount?.Female} คน     รวม ${toNumber(proj.attendants[0].teacherCount?.Male) + toNumber(proj.attendants[0].teacherCount?.Female)} คน\n\t10.4 อื่น ๆ(.....)\t\tชาย............คน       หญิง..............คน     รวม.............คน\n                                                                                                รวม.............คน`
        },
        {
            "สถานที่ปฏิบัติงาน ": `11. สถานที่ปฏิบัติงาน (ระบุชื่อ สถานที่ ตำบล อำเภอ จังหวัด)\n\n\t ${proj.location}\n`,//113
            "เวลเปฏิบัติงาน": `12. ระยะเวลาการปฏิบัติงาน\n\n\t ${duration(proj.startTime,proj.endTime)} `,//113
            "วิธีการดำเนินงาน": `13. วิธีการดำเนินงาน\n\n\t ${setArrayValue(proj.operation,13)}`, // 107
            "งบประมาณ": "14. งบประมาณ",
            "ตาราง 14": "",
            "รวมเงิน14": "                รวมเป็นเงินทั้งสิ้น (ตัวอักษร)\nหมายเหตุ ขอถัวจ่ายทุกรายการ\n",
            "รายการ14": `\t\n                               รายการ\n\n\n      14.1 หมวดค่าใช้สอย\n\n\t ${setArrayValue(proj.budgets[0].costDetails,14.1,'\t ')}     \n  \n      14.2 หมวดค่าตอบแทน\n\n\t ${setArrayValue(proj.budgets[0].remunerationDetails,14.2,'\t ')}       \n\n      14.3 หมวดค่าวัสดุอุปกรณ์\n\n\t ${setArrayValue(proj.budgets[0].equipmentCostDetails,14.3,'\t ')}       \n\n       14.4 ค่าอื่น ๆ\n\n                                  รวม`,
            "จำนวนเงิน14": `\t    จำนวนเงิน (บาท)\n\n      \n\n\t ${setArrayValue(proj.budgets[0].costAmount,null,'\t ')}     \n  \n      \n\n\t ${setArrayValue(proj.budgets[0].remunerationAmount,null,'\t ')}       \n\n     \n\n\t ${setArrayValue(proj.budgets[0].equipmentCostAmount,null,'\t ')}       \n\n              14.4 \n\n               รวม`
        },
        {
            "ผลที่คาดว่าจะได้รับ": `15. ผลที่คาดว่าจะได้รับ\n\n\t ${setArrayValue(proj.expectedOutcomes,15)}`,
            "เป้าหมาย": `16. เป้าหมาย / ตัวบ่งชี้ความสำเร็จ\n\n\tด้านปริมาณ\n\n\t ${setArrayValue(proj.kpi.quantity,16)}\n\t \n\n\tด้านคุณภาพ\n\n\t ${setArrayValue(proj.kpi.quality,16,'',proj.kpi.quantity.length)}`,
            "วิธีการติดตาม": `17. วิธีการติดตามประเมินผล\n\n\t ${setArrayValue(proj.operation,17)}\n`,
            "กำหนดส่งรายงาน": `18.  กำหนดส่งรายงานการประเมินผลภายใน 30 วันหลังเสร็จสิ้นโครงการ คือ\n     วันที่ ${format(new Date(proj.reportSubmissionDeadline),'dd MMMM yyyy', {locale: th})}`,
            "ผู้เสนอโครงการ": "19. ผู้เสนอโครงการ",
            "ลงชื่อที่ปรึกษากลุ่มกิจกรรม": `(ลงชื่อ).............................................\n\n\t      (  ${proj.approved.scaName}  )\n\n             ที่ปรึกษากลุ่มกิจกรรม\t\t\n`,
            "ลงชื่อผู้รับผิดชอบ": `(ลงชื่อ)............................................. \t      (  ${proj.responsibleStudents[0].name}    )

         ผู้รับผิดชอบโครงการ` // 44
        },
        {
            "กำหนดการอย่างละเอียด": "20. กำหนดการอย่างละเอียด",
            "ตราม.": "",
            "กำหนดการตาราง": `\nกำหนดการ\n\nโครงการ ${proj.projectName} \n\nวันเวลาที่ปฏิบัติงาน ${duration(proj.startTime,proj.endTime)} \n\nสถานที่ปฏิบัติงาน ${proj.location} \n`,
            "ตาราง20 ": "",
            "วัน / เวลา 20": "\n              วัน / เวลา",
            "กิจกรรม 20": "\n                                  กิจกรรม",
            "หมายเหตุ 20": "หมายเหตุ กำหนดการสามารถเปลี่ยนแปลงได้ตามความเหมาะสม"
        }
    ]
}


function projectData(proj: IProject) {
    let inputs: any = [];
    deliveryNoteInputs(proj).map((item: any) => inputs.push(item))
    projectInputs(proj).map((item: any) => inputs.push(item))
    return inputs
}

export { projectData, projectSchemas }
