//the index of patients which units of blood are able to be given (0 negative is able to give to everybody so it covers all types of patients)
var toPatients = [
    [0,1,2,3,4,5,6,7],
    [2,3,5,7],
    [2,3,6,7],
    [3,7],
    [4,5,6,7],
    [5,7],
    [6,7],
    [7],
]

$(function(){
    $("#submit-btn").on( "click", function() {
        //make the list of unit of bloods into an array
        var blood = $("#blood-information").val().trim().split(" ").map(Number);
        //make the list of patients into an array
        var patient = $("#patient-information").val().trim().split(" ").map(Number);
        //total blood units given
        var totPatients = 0;

        for (let i = 0; i < 8; i++) {
            var tempBlood = blood[i], tempPatient = patient[i];
            if (tempBlood > tempPatient) {
                blood[i] = tempBlood - tempPatient;
                patient[i] = 0;
                totPatients += tempPatient;
            } else {
                blood[i] = 0;
                patient[i] = tempPatient - tempBlood;
                totPatients += tempBlood;
            }
        }

        //give patients respective blood
        for (let i = 0; i < 8; i++) {
            //patient index
            var patientIdx = 0; 
            
            //if there is blood to give
            while (blood[i] > 0) {
                //temporary values at the given index
                var tempBlood = blood[i], tempPatient = patient[toPatients[i][patientIdx]];

                //break if there are no more possible patients
                if (patientIdx > toPatients[i].length) {
                    break;
                }

                //check if there are no patients available for this blood type
                if (patient[toPatients[i][patientIdx]] == 0 || patient[toPatients[i][patientIdx]] == undefined) {
                    patientIdx++;
                    continue;
                } else {
                    //check if there are more blood units or patients
                    if (tempBlood > tempPatient) {
                        //add number of units of blood given
                        totPatients += tempPatient;
                        //subtract number from both blood and patient
                        blood[i] -= tempPatient;
                        patient[toPatients[i][patientIdx]] = 0; 
                        
                    } else {
                        //add number of units of blood given
                        totPatients += tempBlood;
                        //subtract number from both blood and patient
                        blood[i] = 0;
                        patient[toPatients[i][patientIdx]] -= tempBlood; 
                    }
                    patientIdx++;
                }
            }

            patientIdx = 0;
        } 

        $("#patient").text(totPatients)
    })
});