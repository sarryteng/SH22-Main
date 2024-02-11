
interface TyreState {
    plateNumber: string;
    leftFrontTyre: string;
    rightFrontTyre: string;
    leftBackTyre: string;
    rightBackTyre: string;
}

export const initialTyreState : TyreState = {
    plateNumber: '',
    leftFrontTyre: '',
    rightFrontTyre: '',
    leftBackTyre: '',
    rightBackTyre: '',
}

export const tyreReducer = (state : any, action : any) => {
    switch (action.type) {
        case 'fetchTyreState':
            let queryParams = new URLSearchParams(window.location.search);
            let pnoParam = queryParams.get('licenseplate')||'';
            let readingParam = queryParams.get('sensorreadings')||'';
            let readArray=readingParam.split(',');
            // console.log(readArray);
            // setclt(readArray[0]);
            // setcrt(readArray[1]);
            // setclb(readArray[2]);
            // setcrb(readArray[3]);

            return {
                plateNumber: pnoParam,
                leftFrontTyre: readArray[0],
                rightFrontTyre: readArray[1],
                leftBackTyre: readArray[2],
                rightBackTyre: readArray[3],
            };
        
        case 'updateTyreState':
            return {
                plateNumber: action.plateNumber,
                leftFrontTyre: action.leftFrontTyre,
                rightFrontTyre: action.rightFrontTyre,
                leftBackTyre: action.leftBackTyre,
                rightBackTyre: action.rightBackTyre,
            };

        default:
            throw Error('Unknown action.');
    }
}

export default tyreReducer;