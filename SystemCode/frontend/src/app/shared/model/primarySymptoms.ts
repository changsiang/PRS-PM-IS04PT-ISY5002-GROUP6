export class PrimarySymptoms {
    name: string;
    age: number;
    gender: string;
    nric: string;
    history: string;
    RAPD: boolean;
    red_Eye: boolean;
    eye_Pain: boolean;
    eye_Itch: boolean;
    circumciliary_Injection: boolean;
    headache: boolean;
    eyelid_Swelling: boolean;
    tearing: boolean;
    blurred_Vision: boolean;
    metamorphopsia: boolean;
    floaters: boolean;
    photopsia: boolean;
    unilateral: boolean;

    constructor(name: string,
        age: number,
        gender: string,
        nric: string,
        history: string,
        RAPD: boolean = false,
        red_Eye: boolean = false,
        eye_Pain: boolean = false,
        eye_Itch: boolean = false,
        circumciliary_Injection: boolean = false,
        headache: boolean = false,
        eyelid_Swelling: boolean = false,
        tearing: boolean = false,
        blurred_Vision: boolean = false,
        metamorphopsia: boolean = false,
        floaters: boolean = false,
        photopsia: boolean = false,
        unilateral: boolean = false,
    ) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.nric = nric;
        this.history = history;
        this.RAPD = RAPD;
        this.red_Eye = red_Eye;
        this.eye_Pain = eye_Pain;
        this.eye_Itch = eye_Itch;
        this.circumciliary_Injection = circumciliary_Injection;
        this.headache = headache;
        this.eyelid_Swelling = eyelid_Swelling;
        this.tearing = tearing;
        this.blurred_Vision = blurred_Vision;
        this.metamorphopsia = metamorphopsia;
        this.floaters = floaters;
        this.photopsia = photopsia;
        this.unilateral = unilateral;
    }

    public setPrimarySymptoms(symptoms: string[]): void {
        for (let s of symptoms) {
            switch (s) {
                case 'redEye': {
                    this.red_Eye = true;
                    break;
                }
                case 'eyePain': {
                    this.eye_Pain = true;
                    break;
                }
                case 'headache': {
                    this.headache = true;
                    break;
                }
                case 'eyeItch': {
                    this.eye_Itch = true;
                    break;
                }
                case 'eyeSwell': {
                    this.eyelid_Swelling = true;
                    break;
                }
                case 'tearing': {
                    this.tearing = true;
                    break;
                }
                case 'blurred': {
                    this.blurred_Vision = true;
                    break;
                }
                case 'metamorph': {
                    this.metamorphopsia = true;
                    break;
                }
                case 'floaters': {
                    this.floaters = true;
                    break;
                }
                case 'photopsia': {
                    this.photopsia = true;
                    break;
                }
                case 'unilateral': {
                    this.unilateral = true;
                    break;
                }
                case 'bilateral': {
                    this.unilateral = false;
                    break;
                }
                case 'rapd': {
                    this.RAPD = true;
                    break;
                }

            }
        }
    }

    public toBusinessObject(): any {
        let obj: any = {
            age: this.age,
            gender: this.gender,
            nric: this.nric,
            history: this.history,
            RAPD: this.RAPD,
            red_Eye: this.red_Eye,
            eye_Pain: this.eye_Pain,
            eye_Itch: this.eye_Itch,
            circumciliary_Injection: this.circumciliary_Injection,
            headache: this.headache,
            eyelid_Swelling: this.eyelid_Swelling,
            tearing: this.tearing,
            blurred_Vision: this.blurred_Vision,
            metamorphopsia: this.metamorphopsia,
            floaters: this.floaters,
            photopsia: this.photopsia,
            unilateral: this.unilateral
        };
        return obj;
    }

};