import paymentTokenRequest ,{PaymentTransactionRequest} from "../dto/request/paymentRequest";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import { spawn } from 'child_process';
import * as axios from 'axios';
import { InvoiceListResponseDto } from "../dto/responce/paymentResponseDto";
import { InvoiceMasterRepository } from "../repository/InvoiceRepository";
import InvoiceMapper from "../mapper/InvoiceMapper";


// Update with the absolute path to the PHP executable
const phpPath = 'C:\\Users\\zjutt\\Downloads\\php-8.4.2-nts-Win32-vs17-x64\\php.exe';  // Path to PHP executable

// Absolute path to your PHP file
const phpFilePath = 'C:\\Users\\zjutt\\ts-api-sports-vista-r-and-w\\src\\ideaGenesis.php';  // Update this with the correct path to your PHP file


const transactionApi= 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction'
export default class PaymentWriteService {

  private paymentRepo = InvoiceMasterRepository

    async addPayment(request: paymentTokenRequest): Promise<Response<any>> {
        try {
            const apiResponse = await axios.post(
             'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken',
             request,
             {
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
             }
           );
           return new Response<any>(apiResponse.data, CREATED.status);
         } catch (error: any) {
           console.error('Error in addPayment:', error.response ? error.response.data : error.message);
           throw new Error(
            error.response
              ? `API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
              : 'Failed to retrieve payment token. Please try again.'
          );
        }
     }
    
    async postFinalTransaction(request:PaymentTransactionRequest): Promise <Response<any>>{
        try {
            const apiResponse = await axios.post(
             'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction',
             request,
             {
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
             }
           );
           return new Response<any>(apiResponse.data, CREATED.status);
         } catch (error: any) {
           console.error('Error in addPayment:', error.response ? error.response.data : error.message);
           throw new Error(
            error.response
              ? `API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
              : 'Failed to retrieve payment transaction. Please try again.'
          );
        }
 
    }

    async postDataToPhpFile(): Promise<any> {
      const bookingDetail = {
          transactionAmount: "2100000",
          arenaName: "Athletic Konnect Item",
          arenaSku: "INBOOK-1951",
          noOfBooking: "1",
          customerEmail: "faizanashraf0021@gmail.com",
          customerPhone: "03204498095",
          customerName: "Faizan Ashraf",
          paymentMethodId: "4"
      };
  
      const jsonData = JSON.stringify(bookingDetail);
  
      return new Promise((resolve, reject) => {
          // Spawn a child process to execute the PHP script
          const phpProcess = spawn(phpPath, [phpFilePath]);
  
          let output = '';
          let errorOutput = '';
  
          // Send the data to the PHP script
          phpProcess.stdin.write(jsonData);
          phpProcess.stdin.end();
  
          // Capture the output from PHP
          phpProcess.stdout.on('data', (data) => {
              output += data.toString();
          });
  
          // Capture errors
          phpProcess.stderr.on('data', (data) => {
              errorOutput += data.toString();
          });
  
          // Handle process completion
          phpProcess.on('close', (code) => {
              if (code === 0) {
                  try {
                      // Try parsing the PHP response as JSON
                      const parsedOutput = JSON.parse(output);
                      resolve(parsedOutput);
                  } catch (err) {
                      reject(new Error(`Failed to parse PHP output: ${err.message}`));
                  }
              } else {
                  reject(new Error(`PHP process exited with code ${code}: ${errorOutput}`));
              }
          });
      });
  }

  async getInvoicesList(vendorId: number , userId: number , invoiceId: number , invoiceNumber: string): Promise<Response<any>>{
    let data: any[] = await this.paymentRepo.fetchInvoicesList(vendorId , userId , invoiceId , invoiceNumber);
    let mapData: InvoiceListResponseDto[] = await InvoiceMapper.toInvoiceList(data);
    return new Response<any>(mapData);
  }

}