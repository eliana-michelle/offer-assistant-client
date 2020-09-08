import moment from 'moment';
import XLSX from 'xlsx';
import { uploadSessionsToDB } from '../api/api';

export const UPLOAD_STARTED = 'UPLOAD_STARTED';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const fileUpload = file => {
    return dispatch => {
        dispatch(uploadStarted())

        const uploadedFile = file.target.files[0]
        let importedData = [] 
        const reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile)

        reader.onload = e => {
            let data = e.target.result;
            let readedData = XLSX.read(data, {type: 'array'});
            const wsname = readedData.SheetNames[0];
            let ws = readedData.Sheets[wsname];


        /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, {raw: false, header: 1});
        // setFileUploaded(dataParse);
            dataParse.forEach(array  => {
                if(array.length > 0){
                const arrayToObject = {
                        invoice: array[0],
                        office: array[1],
                        cancel_status: array[2],
                        first_name: array[3].replace(/'/g, "''"), 
                        last_name: array[4].replace(/'/g, "''"),
                        offer_code: array[5], 
                        offer_description: array[6], 
                        letter_sent: array[7] ? moment(array[7]).format('MM/DD/YYYY') : null, 
                        expiration_date: moment(array[8]).format('MM/DD/YYYY'),
                    }
                    importedData.push(arrayToObject)
                }
            })

            importedData.shift()

            uploadSessionsToDB(importedData).then(response => {
                dispatch(uploadSuccess(response))
            })
            .catch(error => {
                dispatch(uploadFailure(error))
            })
        }
    }
}

const uploadStarted = () => ({
    type: UPLOAD_STARTED
})

const uploadSuccess = response => ({
    type: UPLOAD_SUCCESS
})

const uploadFailure = error => ({
    type: UPLOAD_FAILURE, 
    payload: error
})