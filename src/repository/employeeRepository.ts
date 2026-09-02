import EmployeeEntity from "../entity/employeeEntity";
import DataSourceConfig from "../config/dataSourceConfig";

export const EmployeeRepository = DataSourceConfig.getRepository(EmployeeEntity).extend({
    async sarchEmployee(vendorId: number , arenaId: number , employeeId: number , page: number , pageSize: number): Promise<any> {
        let employee = await this.createQueryBuilder('employee')
            .leftJoin('employee.arenas', 'arenas')
            .addSelect(['arenas.arenaId', 'arenas.arenaName'])
            .leftJoin('employee.vendors', 'vendors')
            .addSelect(['vendors.vendorId', 'vendors.fullName'])
            .where("(employee.vendorId = :vendorId)", { vendorId })
            .andWhere('(:arenaId IS NULL OR employee.arenaId = :arenaId)', { arenaId })
            .andWhere('(:employeeId IS NULL OR employee.employeeId = :employeeId)', { employeeId });

        if(page && pageSize){
            await employee.skip((page - 1) * pageSize).take(pageSize);
        }
        return await employee.getManyAndCount();
    },

    async fetchEmployeeMasterPost(): Promise<any[]>{
        return this.createQueryBuilder('employee').getOne();
    },

    async fetchupdateEmployeePatch(employeeId: any): Promise<any>{
        let arenasLookup = await this.createQueryBuilder('employee')
        .where(':employeeId IS NULL OR employee.employeeId = :employeeId', { employeeId })
        .getOne();
        return arenasLookup;
    },

    async fetchEmployeeByEmail(email: any): Promise<EmployeeEntity>{
        return await this.createQueryBuilder('employee')
        .where(':email IS NULL OR employee.email = :email', { email })
        .getOne();
    }
})