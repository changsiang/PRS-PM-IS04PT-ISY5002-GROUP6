export class SecondarySymptoms {
    improve_Lubricants: boolean;
    diabetes: boolean;
    contact_Lens: boolean;
    trauma: boolean;
    white_Spot_Cornea: boolean;
    mid_Dilated_Pupils: boolean;
    reduced_Red_Reflex: boolean;
    improve_Pinhole: boolean;
    resolve_Lubricants: boolean;
    tear_Down_Cheek: boolean;
    redness: boolean;
    cornea_FB: boolean;

    constructor(improve_Lubricants: boolean = false,
        diabetes: boolean = false,
        contact_Lens: boolean = false,
        trauma: boolean = false,
        white_Spot_Cornea: boolean = false,
        mid_Dilated_Pupils: boolean = false,
        reduced_Red_Reflex: boolean = false,
        improve_Pinhole: boolean = false,
        resolve_Lubricants: boolean = false,
        tear_Down_Cheek: boolean = false,
        redness: boolean = false,
        cornea_FB: boolean = false,
    ) {
        this.improve_Lubricants = improve_Lubricants;
        this.diabetes = diabetes;
        this.contact_Lens = contact_Lens;
        this.trauma = trauma;
        this.white_Spot_Cornea = white_Spot_Cornea;
        this.mid_Dilated_Pupils = mid_Dilated_Pupils;
        this.reduced_Red_Reflex = reduced_Red_Reflex;
        this.improve_Pinhole = improve_Pinhole;
        this.resolve_Lubricants = resolve_Lubricants;
        this.tear_Down_Cheek = tear_Down_Cheek;
        this.redness = redness,
            this.cornea_FB = cornea_FB

    }

    public setPrimarySymptoms(symptoms: string[]): void {
        for (let s of symptoms) {
            switch(s) {
                case 'improveLub': {
                    this.improve_Lubricants = true;
                    break;
                }
                case 'resolveLub': {
                    this.resolve_Lubricants = true;
                    break;
                }
                case 'contactLens': {
                    this.contact_Lens = true;
                    break;
                }
                case 'trauma': {
                    this.trauma = true;
                    break;
                }
                case 'itchOverRedness': {
                    break;
                }
                case 'tearRollDown': {
                    this.tear_Down_Cheek = true;
                    break;
                }
                case 'improvePinhole': {
                    this.improve_Pinhole = true;
                    break;
                }
                case 'hasDiabetes': {
                    this.diabetes = true;
                    break;
                }
                case 'corneaFbSeen': {
                    this.cornea_FB = true;
                    break;
                }
                case 'reducedRedReflex': {
                    this.reduced_Red_Reflex = true;
                    break;
                }
                case 'whiteSpot': {
                    this.white_Spot_Cornea = true;
                    break;
                }
                case 'midDilated': {
                    this.mid_Dilated_Pupils = true;
                    break;
                }
            }
        }
    }


    public toForm1Object(): any {
        let obj: any = {
            improve_Lubricants: this.improve_Lubricants,
            diabetes: this.diabetes,
            contact_Lens: this.contact_Lens,
            trauma: this.trauma,
            white_Spot_Cornea: this.white_Spot_Cornea,
            mid_Dilated_Pupils: this.mid_Dilated_Pupils,
            reduced_Red_Reflex: this.reduced_Red_Reflex,
            improve_Pinhole: this.improve_Pinhole,
            resolve_Lubricants: this.resolve_Lubricants,
            tear_Down_Cheek: this.tear_Down_Cheek,
        };
        return obj;
    }

    public toForm2Object(): any {
        let obj: any = {
            improve_Lubricants: this.improve_Lubricants,
            diabetes: this.diabetes,
            contact_Lens: this.contact_Lens,
            trauma: this.trauma,
            white_Spot_Cornea: this.white_Spot_Cornea,
            mid_Dilated_Pupils: this.mid_Dilated_Pupils,
            reduced_Red_Reflex: this.reduced_Red_Reflex,
            improve_Pinhole: this.improve_Pinhole,
            resolve_Lubricants: this.resolve_Lubricants,
            tear_Down_Cheek: this.tear_Down_Cheek,
            redness: this.redness,
            cornea_FB: this.cornea_FB,
        }
        return obj;
    }

    public toForm6Object(): any {
        let obj: any = {
            diabetes: this.diabetes,
            reduced_Red_Reflex: this.reduced_Red_Reflex,
            improve_Pinhole: this.improve_Pinhole,
            tear_Down_Cheek: this.tear_Down_Cheek,
        }
        return obj;
    }
};