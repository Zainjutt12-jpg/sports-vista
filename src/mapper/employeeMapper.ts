import { EmployeeRequestCreate } from "dto/request/employeeRequestDto";
import EmployeeResponceDto from "../dto/responce/employeeResponceDto";
import EmployeeEntity from "../entity/employeeEntity";

export default class EmployeeMapper{

    public static lookupDto(employees: EmployeeEntity[]): EmployeeResponceDto[]{
        let employeeData : EmployeeResponceDto[] = [];
        employees?.forEach((d: any)=>{
            employeeData.push({
                employeeId: d?.employeeId,
                employeeName: d?.employeeName,
                phone: d?.phone,
                address: d?.address,
                salary: d?.salary,
                employmentType: d?.employmentType,
                cnic: d?.cnic,
                email: d?.email,
                arenaId: d?.arenaId,
                arenaName: d?.arenas?.arenaName,
                vendorId: d?.vendorId,
                vendorName: d?.vendors?.fullName,
            })
        })
        return employeeData;
    }

    public static addEmployeeMaster(d: EmployeeRequestCreate): EmployeeEntity{
        let employee: EmployeeEntity = new EmployeeEntity();
        employee.employeeName = d?.employeeName;
        employee.phone = d?.phone;
        employee.address = d?.address;
        employee.salary = Number(d?.salary);
        employee.employmentType = d?.employmentType;
        employee.cnic = d?.cnic;
        employee.email = d?.email;
        employee.arenaId = d?.arenaId;
        employee.vendorId = d?.vendorId;
        employee.password = d?.password;
        return employee;
    }
}