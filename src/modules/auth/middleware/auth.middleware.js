import z from "zod";

function isRequired(value, rule){

  console.log(`inside isRequired :`, value, rule); 

  if(rule || !value){
    throw new Error(`field is required`); 
  }
  return true; 
}

function typeCheck(value, rule){
  if(value === null || value === undefined) return false; 

  if(typef(value) !== rule){
    throw new Error(`Not a Valid type`)
  }
  return true; 
}

function minLengthCheck(value, rule){
  if(value === null || value === undefined) return false; 

  if(String(value).length < rule){
    throw new Error(`Minimum length required 2`); 
  }
  return true;
}

function maxLengthCheck(value, rule){
  if(value === null || value === undefined) return false; 

  if(String(value).length > rule){ 
      throw new Error(`Maximum length required 8`); 
  }
  return true; 
}

const validationList = {
  required : isRequired, 
  minChar: minLengthCheck, 
  maxChar: maxLengthCheck,
  type: typeCheck,
}; 

function validate(schemaField, fieldValue, validations){
  console.log(`Validations`, validations); 

  for(let rule in validations){

    console.log(rule, validations[rule]); 
    if(!Object.hasOwn(validationList, rule)){
      throw new Error(`${rule} not exist`); 
    } 
    let validationCheck = validationList[rule](fieldValue, validations[rule]); 
    console.log(validationCheck); 
  }


}


export const validateUserByField = (template) => (req, res, next) => {
 
  // console.log(template); 
  const templateBody = template.body; 

  const bodyKeys = Object.keys(templateBody);  // array : 
  // console.log(bodyKeys); 

  for(let schemaField of bodyKeys){
    let fieldValue = req.body[schemaField]; 
    validate(schemaField, fieldValue, templateBody[schemaField]); 
}

  next(); 
}

// validation through zod
export const validateUserThroughZod = (schema) => (req, res, next) => {

  const parsedUser = schema.safeParse(req.body); 

	// console.log(parsedUser); 
  console.log(`Inside validation zod middleware`); 
	if(!parsedUser.success){
		const prettyError = z.prettifyError(parsedUser.error);
		// console.log(prettyError); 
		throw new Error(prettyError); 
	}

	return parsedUser;
}
