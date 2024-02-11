
interface TyreState {
    plateNumber: string;
    leftFrontTyre: string;
    rightFrontTyre: string;
    leftRearTyre: string;
    rightRearTyre: string;
}

export const initialTyreState : TyreState = {
    plateNumber: '',
    leftFrontTyre: '',
    rightFrontTyre: '',
    leftRearTyre: '',
    rightRearTyre: '',
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
                leftRearTyre: readArray[2],
                rightRearTyre: readArray[3],
            };
        
        case 'updateLeftFrontTyre':
            return {
                ...state,
                leftFrontTyre: action.payload
            };
        
        case 'updateRightFrontTyre':
            return {
                ...state,
                rightFrontTyre: action.payload
            };
        
        case 'updateleftRearTyre':
            return {
                ...state,
                leftRearTyre: action.payload
            };
        
        case 'updaterightRearTyre':
            return {
                ...state,
                rightRearTyre: action.payload
            };

        default:
            throw Error('Unknown action.');
    }
}

export default tyreReducer;